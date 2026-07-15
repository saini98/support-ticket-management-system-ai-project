export type TransitionMap<State extends string> = Readonly<
  Record<State, readonly State[]>
>;

export class StateMachine<State extends string> {
  constructor(private readonly transitions: TransitionMap<State>) {}

  canTransition(from: State, to: State): boolean {
    if (from === to) {
      return true;
    }

    return this.transitions[from]?.includes(to) ?? false;
  }

  getAllowedTransitions(from: State): readonly State[] {
    return this.transitions[from] ?? [];
  }

  isTerminal(state: State): boolean {
    return this.getAllowedTransitions(state).length === 0;
  }
}
