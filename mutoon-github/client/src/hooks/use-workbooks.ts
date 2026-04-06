import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useWorkbooks() {
  return useQuery({
    queryKey: [api.workbooks.list.path],
    queryFn: async () => {
      const res = await fetch(api.workbooks.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch workbooks");
      return api.workbooks.list.responses[200].parse(await res.json());
    },
  });
}

export function useWorkbook(id: number) {
  return useQuery({
    queryKey: [api.workbooks.get.path, id],
    queryFn: async () => {
      // Note: In a real app we would use buildUrl to replace :id
      // but simple fetch works here for now as id is usually passed as query param or we construct url
      const url = api.workbooks.get.path.replace(":id", id.toString());
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch workbook");
      return api.workbooks.get.responses[200].parse(await res.json());
    },
  });
}
