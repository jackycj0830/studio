
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Edit3 } from 'lucide-react';
import ViewDocumentClient from './ViewDocumentClient';

type DocumentName = 'readme' | 'spec' | 'todolist';

const validDocumentNames: DocumentName[] = ['readme', 'spec', 'todolist'];

async function getDocumentContent(docName: DocumentName): Promise<string> {
  const fileNameMap: Record<DocumentName, string> = {
    readme: 'README.md',
    spec: 'spec.md',
    todolist: 'todolist.md',
  };

  const filePath = path.join(process.cwd(), fileNameMap[docName]);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading ${fileNameMap[docName]}:`, error);
    notFound(); // Or throw an error to be caught by an error boundary
  }
}

function getDocumentTitle(docName: DocumentName): string {
  const titleMap: Record<DocumentName, string> = {
    readme: 'README.md',
    spec: 'Specification Document (spec.md)',
    todolist: 'Todo List (todolist.md)',
  };
  return titleMap[docName];
}

export default async function ViewDocumentPage({ params }: { params: { documentName: string } }) {
  const docName = params.documentName as DocumentName;

  if (!validDocumentNames.includes(docName)) {
    notFound();
  }

  const content = await getDocumentContent(docName);
  const title = getDocumentTitle(docName);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">{title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/edit-document/${docName}`}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Document
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Document Content</CardTitle>
          <CardDescription>Displaying the content of {docName}.md.</CardDescription>
        </CardHeader>
        <CardContent>
          <ViewDocumentClient markdownContent={content} />
        </CardContent>
      </Card>
    </div>
  );
}

// Optional: Generate static params if you know all possible document names
// export async function generateStaticParams() {
//   return validDocumentNames.map((name) => ({
//     documentName: name,
//   }));
// }
