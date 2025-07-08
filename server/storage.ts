import { books, chapters, type Book, type Chapter, type InsertBook, type InsertChapter, type BookWithChapters } from "@shared/schema";

export interface IStorage {
  // Books
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  getBookWithChapters(id: number): Promise<BookWithChapters | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: number): Promise<boolean>;

  // Chapters
  getChaptersByBookId(bookId: number): Promise<Chapter[]>;
  getChapter(id: number): Promise<Chapter | undefined>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;
  updateChapter(id: number, chapter: Partial<InsertChapter>): Promise<Chapter | undefined>;
  deleteChapter(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private books: Map<number, Book>;
  private chapters: Map<number, Chapter>;
  private currentBookId: number;
  private currentChapterId: number;

  constructor() {
    this.books = new Map();
    this.chapters = new Map();
    this.currentBookId = 1;
    this.currentChapterId = 1;
  }

  // Books
  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async getBookWithChapters(id: number): Promise<BookWithChapters | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;

    const bookChapters = Array.from(this.chapters.values())
      .filter(chapter => chapter.bookId === id)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    return {
      ...book,
      chapters: bookChapters,
    };
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { 
      ...insertBook, 
      id,
      color: insertBook.color || this.getRandomBookColor()
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, bookUpdate: Partial<InsertBook>): Promise<Book | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;

    const updatedBook = { ...book, ...bookUpdate };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: number): Promise<boolean> {
    const deleted = this.books.delete(id);
    if (deleted) {
      // Also delete all chapters for this book
      const chapterIds = Array.from(this.chapters.entries())
        .filter(([_, chapter]) => chapter.bookId === id)
        .map(([id, _]) => id);
      
      chapterIds.forEach(chapterId => this.chapters.delete(chapterId));
    }
    return deleted;
  }

  // Chapters
  async getChaptersByBookId(bookId: number): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.bookId === bookId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getChapter(id: number): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  async createChapter(insertChapter: InsertChapter): Promise<Chapter> {
    const id = this.currentChapterId++;
    const existingChapters = await this.getChaptersByBookId(insertChapter.bookId);
    const orderIndex = insertChapter.orderIndex || existingChapters.length;
    
    const chapter: Chapter = { 
      ...insertChapter, 
      id,
      orderIndex,
      status: insertChapter.status || "normal"
    };
    this.chapters.set(id, chapter);
    return chapter;
  }

  async updateChapter(id: number, chapterUpdate: Partial<InsertChapter>): Promise<Chapter | undefined> {
    const chapter = this.chapters.get(id);
    if (!chapter) return undefined;

    const updatedChapter = { ...chapter, ...chapterUpdate };
    this.chapters.set(id, updatedChapter);
    return updatedChapter;
  }

  async deleteChapter(id: number): Promise<boolean> {
    return this.chapters.delete(id);
  }

  private getRandomBookColor(): string {
    const colors = ["blue", "green", "purple", "red", "orange", "teal", "indigo", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

export const storage = new MemStorage();
