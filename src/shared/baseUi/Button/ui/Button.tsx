import style from './button.module.scss'
import { BUTTON_VARIANT } from '../types/types'

const BUTTON_VARIANT_VIEW_MAP: Record<BUTTON_VARIANT, string> = {
    [BUTTON_VARIANT.PRIMARY]: 'red',
    [BUTTON_VARIANT.SECONDARY]: 'lightgreen',
}

export interface IButton {
    children: string
    variant: BUTTON_VARIANT
    click: (item?: any) => void
}

export const Button = ({ children, variant, click }: IButton) => {
    return <button
                className={style.btn}
                style={{background: BUTTON_VARIANT_VIEW_MAP[variant]}}
                onClick={click}
            >
                { children }
            </button>
}