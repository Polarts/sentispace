export type TransitionDefinition = {
    duration: number,
    type: string
}

export type AnimationDefinition = {
    transition: TransitionDefinition,
    animate: any,
    initial: any,
    exit: any
}

export const transition: TransitionDefinition = {
    duration: 0.3,
    type: "just",
}

export const fade: AnimationDefinition = {
    transition,
    animate: { opacity: 1 },
    initial: { opacity: 0 },
    exit: { opacity: 0 },
}

export const halfFade: AnimationDefinition = {
    transition,
    animate: { opacity: 0.5 },
    initial: { opacity: 0 },
    exit: { opacity: 0 },
}

export const inflate: AnimationDefinition = {
    transition,
    animate: { scale: 1, opacity: 1 },
    initial: { scale: 0, opacity: 0 },
    exit: { scale: 0, opacity: 0 },
}

export const translateX: AnimationDefinition = {
    transition,
    animate: { x: '0%' },
    initial: { x: '100%' },
    exit: { x: '100%' },
}

export const translateY: AnimationDefinition = {
    transition,
    animate: { y: '0%' },
    initial: { y: '100%' },
    exit: { y: '100%' },
}
