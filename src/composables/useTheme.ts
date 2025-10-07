import { inject, type InjectionKey, provide, type Ref, ref, watchEffect } from 'vue'

export const ThemeSymbol:InjectionKey<ThemeContext> = Symbol('theme')

interface ThemeContext {
  theme: Ref<'light' | 'dark'>;
  toggleTheme: () => void;
}
export function useThemeProvider() {
  const theme = ref<'light' | 'dark'>('light')

  watchEffect(() => {
    localStorage.setItem('vue-chat-theme', theme.value)

    document.documentElement.setAttribute('data-theme', theme.value)
  })

  const savedTheme = localStorage.getItem('vue-chat-theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    theme.value = savedTheme
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  provide(ThemeSymbol, {
    theme, toggleTheme
  })
  return {
    theme, toggleTheme
  }
}

export function useTheme() {

  const themeContext = inject(ThemeSymbol)

  if(!themeContext) {
    throw new Error('test')
  }

  return themeContext
}