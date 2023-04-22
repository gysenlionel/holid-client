export const BUTTON_STYLES = {
    OUTLINE: 'outline',
    SOLID: 'solid'
} as const;

export type ButtonStyles = typeof BUTTON_STYLES[keyof typeof BUTTON_STYLES]

export const INPUT_STYLES = {
    INPUTNORMAL: 'inputNormal',
    INPUTBOOKING: 'inputBooking'
} as const

export type InputStyles = typeof INPUT_STYLES[keyof typeof INPUT_STYLES] 