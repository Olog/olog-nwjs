// Type declaration for module 'git-grep'
// See: github.com/alessioalex/git-grep

declare namespace gitgrep {

  export interface IGrepGrepResult {
  file: string;
  line: string;
  text: string;
  }

  export interface IGitGrepHandler {
    (eventName: 'error', cb: (err: any) => void): IGitGrepEmitter;
    (eventName: 'data', cb: (data: IGrepGrepResult) => void): IGitGrepEmitter;
    (eventName: 'end', cb: () => void): IGitGrepEmitter;
  }

  export interface IGitGrepEmitter {
    on: IGitGrepHandler;
  }

  export interface IGitGrepOptions {
    rev?: string;
    term?: string;
  }

  export interface IGitGrep {
    (repoPath: string, options?: IGitGrepOptions): gitgrep.IGitGrepEmitter;
  }
}

declare module 'git-grep' {

  var gitGrep: gitgrep.IGitGrep;

  export = gitGrep;
}
