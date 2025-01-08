import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchForm from '@/components/SearchForm';
import RecentAnalyses from '@/components/RecentAnalyses';
import GuideSection from '@/components/GuideSection';
import UpcomingFeatures from '@/components/UpcomingFeatures';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <SearchForm />
      <Hero />
      <div className="-mt-32">
        <RecentAnalyses />
        <GuideSection />
        <UpcomingFeatures />
      </div>
    </main>
  );
}
