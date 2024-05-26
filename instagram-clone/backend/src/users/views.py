# users/views.py

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Post
from .serializers import ProfileSerializer, PostSerializer

@api_view(['GET'])
def get_user_profile(request, username):
    try:
        user = User.objects.get(username=username)
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_news_feed(request):
    user = request.user
    following = user.profile.following.all()
    posts = Post.objects.filter(author__in=following)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def like_post(request, post_id):
    post = Post.objects.get(id=post_id)
    post.likes.add(request.user)
    post.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def add_comment(request, post_id):
    post = Post.objects.get(id=post_id)
    comment = request.data.get('comment')
    post.comments.create(user=request.user, text=comment)
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def share_post(request, post_id):
    post = Post.objects.get(id=post_id)
    new_post = Post(author=request.user, image=post.image, caption=post.caption)
    new_post.save()
    return Response(status=status.HTTP_201_CREATED)