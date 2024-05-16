async function fetchData<Data>(
  url: string,
  options: RequestInit
): Promise<{ message: 'success'; data: Data } | { message: 'fail'; data: string }>;

async function fetchData(url: string, options: RequestInit) {
  // 这里的 try catch 用来捕获请求失败的情况，比如 404、500 等
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      message: 'fail',
      data: error
    };
  }
}

export default fetchData;
