import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookWithChapters, Chapter } from "@shared/schema";
import { AddChapterModal } from "@/components/AddChapterModal";
import { ArrowLeft, Plus, Check, AlertTriangle, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface ChaptersProps {
  bookId: string;
}

export default function Chapters({ bookId }: ChaptersProps) {
  const [, navigate] = useLocation();
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery<BookWithChapters>({
    queryKey: ["/api/books", bookId],
    queryFn: async () => {
      const response = await fetch(`/api/books/${bookId}`);
      if (!response.ok) throw new Error("Failed to fetch book");
      return response.json();
    },
  });

  const updateChapterMutation = useMutation({
    mutationFn: async ({ chapterId, status }: { chapterId: number; status: string }) => {
      await apiRequest("PUT", `/api/chapters/${chapterId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books", bookId] });
    },
  });

  const getChapterBackground = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "difficult":
        return "bg-red-200 border-red-400";
      case "reread":
        return "bg-blue-200 border-blue-400";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getChapterTitleClass = (status: string) => {
    switch (status) {
      case "completed":
        return "text-lg font-semibold text-gray-700 line-through decoration-2";
      case "difficult":
        return "text-lg font-semibold text-red-800";
      case "reread":
        return "text-lg font-semibold text-blue-800";
      default:
        return "text-lg font-semibold text-gray-900";
    }
  };

  const getStatusButtonClass = (buttonStatus: string, currentStatus: string) => {
    const isActive = buttonStatus === currentStatus;
    
    switch (buttonStatus) {
      case "completed":
        return isActive
          ? "px-2 py-1 rounded-full text-xs font-semibold bg-success text-white shadow-md transform scale-105"
          : "px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transition-all duration-200";
      case "difficult":
        return isActive
          ? "px-2 py-1 rounded-full text-xs font-semibold bg-error text-white shadow-md transform scale-105"
          : "px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transition-all duration-200";
      case "reread":
        return isActive
          ? "px-2 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-md transform scale-105"
          : "px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transition-all duration-200";
      default:
        return "px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transition-all duration-200";
    }
  };

  const handleStatusChange = (chapterId: number, newStatus: string, currentStatus: string) => {
    // If clicking the same status, toggle it off (set to normal)
    const statusToSet = newStatus === currentStatus ? "normal" : newStatus;
    updateChapterMutation.mutate({ chapterId, status: statusToSet });
  };

  const calculateProgress = () => {
    if (!book?.chapters.length) return 0;
    const completedChapters = book.chapters.filter(chapter => chapter.status === "completed").length;
    return (completedChapters / book.chapters.length) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-600 mb-2">Book not found</h2>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:text-blue-700"
          >
            Return to bookshelf
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Back Button & Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-800 mr-6 p-3 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg">Track your reading progress</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 mb-10 relative overflow-hidden">
        <div 
          className="bg-success h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${calculateProgress()}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4 mb-12">
        {book.chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`rounded-xl shadow-md border-2 p-6 flex items-center justify-between transition-all duration-200 hover:shadow-lg ${getChapterBackground(chapter.status)}`}
          >
            <div className="flex-1">
              <h3 className={getChapterTitleClass(chapter.status)}>
                {chapter.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Chapter {index + 1}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusChange(chapter.id, "completed", chapter.status)}
                className={getStatusButtonClass("completed", chapter.status)}
              >
                <Check className="h-3 w-3 mr-1" />
                Done
              </button>
              <button
                onClick={() => handleStatusChange(chapter.id, "difficult", chapter.status)}
                className={getStatusButtonClass("difficult", chapter.status)}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Hard
              </button>
              <button
                onClick={() => handleStatusChange(chapter.id, "reread", chapter.status)}
                className={getStatusButtonClass("reread", chapter.status)}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Re-read
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Chapter Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-3 transform hover:scale-105"
        >
          <Plus className="h-6 w-6" />
          <span className="text-lg">Add Chapter</span>
        </button>
      </div>

      {/* Add Chapter Modal */}
      <AddChapterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        bookId={parseInt(bookId)}
      />
    </div>
  );
}
