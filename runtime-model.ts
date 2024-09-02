/**
 * Options for how Butterfloat should run
 */
export interface RuntimeOptions {
  /**
   * Primarily a tool for debugging: Don't remove unbound DOM nodes when components complete.
   */
  preserveOnComplete?: boolean
}
