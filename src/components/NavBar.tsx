'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, Globe } from 'lucide-react'
import React from 'react'
import Button from './ui/button'
import { useLanguage } from '@/providers/language-provider'


const menuItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]
const NavBar: React.FC = () => {
  const [menuState, setMenuState] = React.useState(false)
  const { language, setLanguage } = useLanguage()
  const { t } = useLanguage();

  const changeLang = (lang: 'en' | 'ro') => {
    if (lang === language) return
    setLanguage(lang)
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = lang
  }

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setMenuState(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const LangSwitcher = (
    <div className="flex items-center gap-2">
      <Globe className="size-4 opacity-70" aria-hidden />
      <div className="inline-flex rounded-md border p-0.5">
        <button
          type="button"
          onClick={() => changeLang('en')}
          className={
            'px-2.5 py-1 text-xs rounded-sm transition ' +
            (language === 'en'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground')
          }
          aria-pressed={language === 'en'}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => changeLang('ro')}
          className={
            'px-2.5 py-1 text-xs rounded-sm transition ' +
            (language === 'ro'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground')
          }
          aria-pressed={language === 'ro'}
        >
          RO
        </button>
      </div>
    </div>
  )

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              {/* Desktop menu */}
              <div className="hidden lg:block">
                <ul className="flex items-center gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: mobile panel + desktop actions */}
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              {/* Mobile menu list */}
              <div className="lg:hidden w-full">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Language switcher (mobile + desktop) */}
              <div className="w-full lg:w-auto">{LangSwitcher}</div>

              {/* Auth buttons */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <Link href="#downloadcv" onClick={(e) => handleNavClick(e, 'downloadcv')}>
                    <span>{t("downloadCV.download-button")}</span>
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                    <span>{t("navigation.contact")}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
