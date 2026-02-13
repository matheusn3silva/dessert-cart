import type IDessert from "@/interfaces/IDessert";

async function getDataUrl<T>(url: string) {
  const resposta = await fetch(url);
  return resposta.json() as T;
}

export async function getDesserts() {
  return getDataUrl<IDessert[]>('https://gist.githubusercontent.com/matheusn3silva/d60a965b3e110681d70b24606751cf01/raw/2e18127afb749eaecbfdf6a1271a0ddbae009a77/dessert.json');
}