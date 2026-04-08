import { Card } from 'primereact/card';

import { ThemeSwitcherModal } from '@/components';

export default function HomePage() {
  return (
    <div className="home-page-container">
      <main className="home-page-content">
        <ThemeSwitcherModal />
        <Card>
          <h1>Hello World</h1>
        </Card>
      </main>
    </div>
  );
}
