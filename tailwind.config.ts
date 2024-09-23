import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard Variable"],
      },
    },
  },
  plugins: [],
} satisfies Config;
