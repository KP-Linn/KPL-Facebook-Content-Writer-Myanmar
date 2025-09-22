
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ContentForm } from './components/ContentForm';
import { GeneratedContent } from './components/GeneratedContent';
import { generateFacebookContent } from './services/geminiService';
import type { FormData } from './types';
import { TONES, FORMATS, AUDIENCES } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: TONES[0].value,
    format: FORMATS[0].value,
    audience: AUDIENCES[0].value,
  });
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = useCallback(async () => {
    if (!formData.topic) {
        setError('Please enter a topic to generate content.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    try {
      const content = await generateFacebookContent(formData);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError('Failed to generate content. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-teal-500/80 selection:text-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <ContentForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleGenerateContent}
            isLoading={isLoading}
          />
          <GeneratedContent
            content={generatedContent}
            isLoading={isLoading}
          />
        </div>

        {error && (
            <div className="mt-8 max-w-xl mx-auto p-4 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg text-center">
                <p>{error}</p>
            </div>
        )}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
