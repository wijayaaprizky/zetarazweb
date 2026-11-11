import React from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import ArticleEditorForm from '@/components/admin/ArticleEditorForm';

export default async function NewArticlePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  return <ArticleEditorForm categories={categories} />;
}
