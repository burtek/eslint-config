export interface Config {
    name: string;
    enabled: boolean;
}

export function createConfig(name: string): Config {
    return {
        enabled: true,
        name
    };
}

export function formatConfig(config: Config): string {
    return `${config.name}: ${config.enabled}`;
}
