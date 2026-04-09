import { DateCalculatorPage } from '@/features/date-calculator';

export default function HomePage() {
  return (
    <div className="home-page-container">
      <main className="home-page-content w-full">
        <DateCalculatorPage />
      </main>
    </div>
  );
}
