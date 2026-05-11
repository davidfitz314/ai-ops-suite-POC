const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function mockFetch<T>(data: T, ms = 300): Promise<T> {
  await delay(ms);
  return JSON.parse(JSON.stringify(data)); // simulate network clone
}
