import { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useThemeContext } from './themeContext'

const availableThemeColors = [
  { name: "Default", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Slate", light: "bg-slate-500", dark: "bg-slate-700" },
  { name: "Violet", light: "bg-violet-500", dark: "bg-violet-700" },

  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },

  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  { name: "Yellow", light: "bg-yellow-500", dark: "bg-yellow-700" },
];

const ThemeUpdate = () => {
  const { setTheme, theme } = useTheme()
  const { themeColor, setThemeColor } = useThemeContext()

  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex item-center space-x-3">
          <div
            className={cn(
              'rounded-full',
              'w-[20px]',
              'h-[20px]',
              theme === 'dark' ? dark : light,
            )}
          ></div>
          <div className="text-sm">{name}</div>
        </div>
      </SelectItem>
    ))
  }

  return (
    <Fragment>
       <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex relative overflow-hidden group"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-transform group-hover:rotate-45 duration-300" />
                  ) : (
                    <Moon className="h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
                  )}
                  <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="sr-only">Toggle theme</span>
                </Button>

      <Select
        onValueChange={(value) => setThemeColor(value as ThemeColors)}
        defaultValue={themeColor}
      >
        <SelectTrigger className="w-[180px] ring-offset-transparent focus:ring-transparent">
          <SelectValue placeholder="Select Color" />
        </SelectTrigger>
        <SelectContent className="border-muted">
          {createSelectItems()}
        </SelectContent>
      </Select>
    </Fragment>
  )
}

export default ThemeUpdate
