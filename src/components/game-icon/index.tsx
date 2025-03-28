import React from 'react'
import AngelWings from './angel-wings.svg?react'
import Enrage from './enrage.svg?react'
import Freemasonry from './freemasonry.svg?react'
import HoodedFigure from './hooded-figure.svg?react'
import Hoodie from './hoodie.svg?react'
import KevlarVest from './kevlar-vest.svg?react'
import MeshNetwork from './mesh-network.svg?react'
import SecretBook from './secret-book.svg?react'
import SmokingFinger from './smoking-finger.svg?react'
import SwordAltar from './sword-altar.svg?react'
import Uncertainty from './uncertainty.svg?react'
import WarlockEye from './warlock-eye.svg?react'
import Werewolf from './werewolf.svg?react'

const SVG_FOR_ICON: {
    [icon: string]: React.FunctionComponent
} = {
    'angel-wings': AngelWings,
    'enrage': Enrage,
    'freemasonry': Freemasonry,
    'hooded-figure': HoodedFigure,
    'hoodie': Hoodie,
    'kevlar-vest': KevlarVest,
    'mesh-network': MeshNetwork,
    'secret-book': SecretBook,
    'smoking-finger': SmokingFinger,
    'sword-altar': SwordAltar,
    'warlock-eye': WarlockEye,
    'werewolf': Werewolf,
}

export const GameIcon = ({ icon, className }: { 
    icon: string,
    className?: string,
}) => {
    const IconSvg = SVG_FOR_ICON[icon] || Uncertainty
    return (
        <span className={`game-icon ${className || ''}`.trim()}>
            <IconSvg />
        </span>
    )
}