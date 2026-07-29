from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from .serializers import UserSerializer, RegisterSerializer
from .models import LoginHistory
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    """
    Endpoint to set the CSRF cookie for the SPA.
    """
    return Response({'csrfToken': get_token(request)})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return Response({
            "user": UserSerializer(user).data,
            "message": "Registration successful."
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Authenticate (this also triggers axes checks)
    user = authenticate(request, username=username, password=password)
    
    # Grab client IP
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')

    user_agent = request.META.get('HTTP_USER_AGENT', '')

    if user:
        login(request, user)
        LoginHistory.objects.create(user=user, ip_address=ip, user_agent=user_agent, status='SUCCESS')
        return Response({
            "user": UserSerializer(user).data,
            "message": "Login successful."
        })
    else:
        # User is None, which could mean bad credentials OR locked out by axes.
        # Axes intercepts the request and returns a 403 if locked out.
        # But if authenticate fails normally, we return 400.
        LoginHistory.objects.create(user=None, ip_address=ip, user_agent=user_agent, status='FAILED')
        return Response({"error": "Invalid Credentials or Account Locked."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({"success": "Logged out successfully"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_profile(request):
    if not request.user.is_authenticated:
        return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(UserSerializer(request.user).data)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    if user:
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173').rstrip('/')
        reset_url = f"{frontend_url}/#/reset-password?uid={uid}&token={token}"
        send_mail(
            "Password Reset Request",
            f"Please click the link below to reset your password:\n\n{reset_url}",
            settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'noreply@indibuzz.in',
            [email],
            fail_silently=False,
        )
    # Always return success to prevent email enumeration
    return Response({"message": "If an account with this email exists, a password reset link has been sent."})

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    password = request.data.get('password')

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.set_password(password)
        user.save()
        return Response({"message": "Password reset successfully."})
    else:
        return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

