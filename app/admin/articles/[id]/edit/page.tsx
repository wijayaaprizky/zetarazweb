import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import ArticleEditorForm from '@/components/admin/ArticleEditorForm';

interface EditArticlePageProps {
  params: { id: string };
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      tags: { include: { tag: true } },
    },
  });

  if (!article) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  return <ArticleEditorForm initialData={article} categories={categories} />;
}
