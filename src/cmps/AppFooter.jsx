
import privacy from '../assets/img/svgs/privacy.svg'

export function AppFooter() {

  return (
    <footer className='app-footer main-layout full'>
      <div>
        <span>
          @2024 Journey, inc • Terms • Sitemap • Privacy • Your Privacy
          Choices <img src={privacy} alt='privacy' />
        </span>
      </div>
    </footer>
  )
}
