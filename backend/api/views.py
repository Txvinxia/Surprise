from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.shortcuts import get_object_or_404
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None):
        queryset = self.queryset
        project = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, pk=None):
        queryset = self.queryset
        project = get_object_or_404(queryset, pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        queryset = self.queryset
        project = get_object_or_404(queryset, pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)