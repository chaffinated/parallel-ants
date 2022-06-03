
export function wait(delay: number): Promise<any> {
  return new Promise((res) => setTimeout(res, delay));
}

export default wait;
