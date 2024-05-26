# File: instagram-clone/backend/src/users/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_view, name='profile'),
    path('post/create/', views.create_post_view, name='create_post'),
    path('post/<int:post_id>/', views.post_detail_view, name='post_detail'),
    path('post/<int:post_id>/like/', views.like_post_view, name='like_post'),
    path('post/<int:post_id>/comment/', views.comment_post_view, name='comment_post'),
    path('post/<int:post_id>/share/', views.share_post_view, name='share_post'),
    path('direct_message/<int:user_id>/', views.direct_message_view, name='direct_message'),
    path('search/', views.search_view, name='search'),
    path('edit_profile/', views.edit_profile_view, name='edit_profile'),
    path('privacy_settings/', views.privacy_settings_view, name='privacy_settings'),
]