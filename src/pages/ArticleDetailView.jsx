import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleById } from '../utils/dataLoader';
import DecisionBadge from '../components/DecisionBadge';
import ScoreBreakdown from '../components/ScoreBreakdown';
import RecommendationList from '../components/RecommendationList';
import CompetitorTable from '../components/CompetitorTable';
import { ArrowLeft, Target, Globe, AlertCircle, RefreshCw } from 'lucide-react';

export default function ArticleDetailView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticle = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try{
      const data=await fetchArticleById(id);
      setArticle(data);
      
    }
    catch(err){
      setError(err.message || 'Failed to load article detail.');
      
    }
    finally{
      setLoading(false);
    }

  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  

  {loading && (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-10 h-10 animate-spin text-indigo-500" />
        </div>
      )}

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-center text-center p-12 glass-panel rounded-3xl border border-rose-500/20 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Article Not Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{error || 'The requested article could not be retrieved.'}</p>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-250 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to List
            </Link>
            <button
              onClick={() => loadArticle(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md focus:outline-none transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { title, tenant, target_keyword, final_score, decision, scores, missing_topics, recommendations, competitors } = article;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 focus:outline-none transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Article List
        </Link>
      </div>

       {/* Main Two Column Layout  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary and Core Scores */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Article Main Info and Gauge */}
          <div className="glass-panel p-6 rounded-3xl shadow-sm flex flex-col items-center text-center space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5" />
                <span>{tenant}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-800 dark:text-white leading-snug max-w-md mx-auto">
                {title}
              </h1>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                <Target className="w-3.5 h-3.5" />
                <span>Target: <strong>{target_keyword}</strong></span>
              </div>
            </div>

            
            <div className="py-4 border-t border-b border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center gap-6">
             
              <div className="flex flex-col items-start gap-1">
                <DecisionBadge decision={decision} />
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="glass-panel p-6 rounded-3xl shadow-sm">
            
            <ScoreBreakdown scores={scores} />
          </div>
        </div>

        {/* Right Column: Recommendations and Competitors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 3: Actionable items and missing topics */}
          <div className="glass-panel p-6 rounded-3xl shadow-sm">
            <RecommendationList
              recommendations={recommendations}
              missingTopics={missing_topics}
            />
          </div>

          {/* Card 4: Competitor Table */}
          <div className="glass-panel p-6 rounded-3xl shadow-sm">
            <CompetitorTable
              competitors={competitors}
              articleScore={final_score}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
