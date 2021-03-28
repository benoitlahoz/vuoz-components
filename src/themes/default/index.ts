import * as pkg from '../../../package.json'

/**
 * The default theme.
 * @module DefaultTheme
 * 
 * @see https://shouts.dev/create-multiple-themes-in-vuejs
 */

/**
 * An unique identifier for this theme, to be set by each theme module.
 * @constant
 * @memberof module:DefaultTheme
 */
 const THEME_ID = 'core:default'
 /**
  * The unique displayable name of the theme.
  * @constant
  * @memberof module:DefaultTheme
  */
 const THEME_NAME = 'Default (dark)'

export const Theme = {
  id: THEME_ID,
  name: THEME_NAME,
  // Paths relative to dist folder
  sass: `${pkg.name}/dist/themes/default/sass/theme.sass`,
  css: `${pkg.name}/dist/themes/default/css/theme.css`
}