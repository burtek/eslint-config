interface GreetingProps {
    name: string;
}

export function Greeting({ name }: GreetingProps) {
    return <div>{name}</div>;
}
Greeting.displayName = 'Greeting';
