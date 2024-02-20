from django.urls import path
from playlists import views


urlpatterns = [
    path('playlists/', views.PlaylistList.as_view()),
    path('playlists/<int:pk>', views.PlaylistDetail.as_view()),
]
