import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@shared/schema";
import { AddBookModal } from "@/components/AddBookModal";
import { BookOpen, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function Bookshelf() {
  const [, navigate] = useLocation();
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const { data: booksWithChapters = {} } = useQuery<{[key: number]: number}>({
    queryKey: ["/api/books/chapters-count"],
    queryFn: async () => {
      const chapterCounts: {[key: number]: number} = {};
      for (const book of books) {
        const response = await fetch(`/api/books/${book.id}`);
        if (response.ok) {
          const bookData = await response.json();
          chapterCounts[book.id] = bookData.chapters.length;
        }
      }
      return chapterCounts;
    },
    enabled: books.length > 0,
  });

  const getBookColorClass = (color: string) => {
    const colorMap = {
      blue: "from-blue-600 to-blue-700",
      green: "from-green-600 to-green-700",
      purple: "from-purple-600 to-purple-700",
      red: "from-red-600 to-red-700",
      orange: "from-orange-600 to-orange-700",
      teal: "from-teal-600 to-teal-700",
      indigo: "from-indigo-600 to-indigo-700",
      pink: "from-pink-600 to-pink-700",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">My Reading Tracker</h1>
        <p className="text-gray-600 text-lg">Organize your books and track your reading progress</p>
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your bookshelf is empty</h2>
            <p className="text-gray-500 text-lg mb-6">Add your first book to start tracking your reading journey</p>
          </div>
        </div>
      )}

      {/* Bookshelf Grid */}
      {books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {books.map((book) => (
            <div
              key={book.id}
              className={`bg-gradient-to-b ${getBookColorClass(book.color)} rounded-xl shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 h-52 flex flex-col justify-between p-5 text-white relative group`}
              onClick={() => handleBookClick(book.id)}
            >
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-base font-semibold text-center leading-snug">
                  {book.title}
                </h3>
              </div>
              <div className="text-xs opacity-80 text-center font-medium">
                {booksWithChapters[book.id] || 0} chapters
              </div>
              <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Book Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-3 transform hover:scale-105"
        >
          <Plus className="h-6 w-6" />
          <span className="text-lg">Add Book</span>
        </button>
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
