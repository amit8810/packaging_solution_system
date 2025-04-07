interface ICushioningRule {
    [key: string]: number;
}

export const CUSHIONING_RULE: ICushioningRule = {
    unbreakable: 1,
    'semi-fragile': 2,
    fragile: 3,
} as const;
