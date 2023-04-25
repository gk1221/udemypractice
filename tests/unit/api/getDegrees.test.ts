import type { Mock } from "vitest";
import axios from "axios";
import { vi } from "vitest";

import getDegrees from "@/api/getDegrees";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, degree: "Master's" }],
    });
  });
  it("fetches degrees that candidates can apply to", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extracts degree from response", async () => {
    const degree = await getDegrees();
    expect(degree).toEqual([{ id: 1, degree: "Master's" }]);
  });
});
