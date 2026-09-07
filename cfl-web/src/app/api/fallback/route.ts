import { NextResponse } from "next/server";
import * as cfl from "commonfunlib";

const numberValue = (value: string | undefined) => Number(value);

const runFallback = async (
  endpoint: string,
  values: Record<string, string>,
  file?: { buffer: Buffer; name: string }
) => {
  const [category, tool] = endpoint.split("/").filter(Boolean);

  if (category === "common") {
    const commonResults: Record<string, unknown> = {
      even: cfl.isEven(numberValue(values.num)),
      odd: cfl.isOdd(numberValue(values.num)),
      factorial: cfl.factorial(numberValue(values.num)),
      gcd: cfl.gcd(numberValue(values.a), numberValue(values.b)),
      lcm: cfl.lcm(numberValue(values.a), numberValue(values.b)),
      prime: cfl.isPrime(numberValue(values.num)),
      reverse: cfl.reverseString(values.str ?? ""),
      palindrome: cfl.isPalindrome(values.str ?? ""),
      slugify: cfl.slugify(values.str ?? ""),
      slugifyLink: cfl.slugifyLink(values.link ?? ""),
      clamp: cfl.clamp(numberValue(values.num), numberValue(values.min), numberValue(values.max)),
      percentage: cfl.percentage(numberValue(values.part), numberValue(values.total)),
      fibonacci: cfl.fibonacci(numberValue(values.count)),
      average: cfl.average(values.numbers ?? ""),
      median: cfl.median(values.numbers ?? ""),
      titleCase: cfl.titleCase(values.str ?? ""),
      wordCount: cfl.wordCount(values.str ?? ""),
      isValidEmail: cfl.isValidEmail(values.email ?? ""),
      truncate: cfl.truncate(values.str ?? "", numberValue(values.maxLength), values.suffix),
    };
    const resultKeys: Record<string, string> = {
      even: "isEven", odd: "isOdd", factorial: "factorial", gcd: "gcd", lcm: "lcm",
      prime: "isPrime", reverse: "reversedString", palindrome: "isPalindrome", slugify: "slug",
      slugifyLink: "slug", clamp: "clamped", percentage: "percentage", fibonacci: "fibonacci",
      average: "average", median: "median", titleCase: "titleCase", wordCount: "wordCount",
      isValidEmail: "isValidEmail", truncate: "truncated",
    };
    return { [resultKeys[tool]]: commonResults[tool] };
  }

  if (category === "generate") {
    const generated: Record<string, unknown> = {
      randomName: cfl.generateRandomName(),
      randomNumber: cfl.generateRandomNumber(numberValue(values.min), numberValue(values.max)),
      randomPassword: cfl.generatePassword(numberValue(values.length)),
      uuid: cfl.generateUuid(),
      token: cfl.generateToken(numberValue(values.bytes)),
      pin: cfl.generatePin(numberValue(values.digits)),
      color: cfl.generateColor(),
      lorem: cfl.generateLorem(numberValue(values.words)),
      nanoid: cfl.generateNanoId(numberValue(values.length)),
      apiKey: cfl.generateApiKey(values.prefix || "cfl", numberValue(values.bytes)),
      macAddress: cfl.generateMacAddress(),
      semver: cfl.generateSemver(numberValue(values.major)),
      timestamp: cfl.generateTimestamp(values.format as "iso" | "seconds" | "milliseconds"),
      username: cfl.generateUsername(),
      qrCode: await cfl.generateQrCode(values.value, {
        width: numberValue(values.width),
        margin: numberValue(values.margin),
      }),
      steganopass: file
        ? cfl.generateSteganoPass(file.buffer, file.name)
        : (() => { throw new Error("A file is required."); })(),
    };
    return { [tool]: generated[tool] };
  }

  if (category === "hash") {
    const hashResults: Record<string, unknown> = {
      md5: cfl.md5(values.input ?? ""), sha1: cfl.sha1(values.input ?? ""),
      sha256: cfl.sha256(values.input ?? ""), sha384: cfl.sha384(values.input ?? ""),
      sha512: cfl.sha512(values.input ?? ""), "sha3-256": cfl.sha3_256(values.input ?? ""),
      "sha3-512": cfl.sha3_512(values.input ?? ""), base64Encode: cfl.base64Encode(values.input ?? ""),
      base64Decode: cfl.base64Decode(values.input ?? ""),
      hmacSha256: cfl.hmacSha256(values.input ?? "", values.secret ?? ""),
      hmacSha512: cfl.hmacSha512(values.input ?? "", values.secret ?? ""),
      base64UrlEncode: cfl.base64UrlEncode(values.input ?? ""),
      base64UrlDecode: cfl.base64UrlDecode(values.input ?? ""), checksum: cfl.checksum(values.input ?? ""),
      urlEncode: cfl.urlEncode(values.input ?? ""),
      urlDecode: cfl.urlDecode(values.input ?? ""),
    };
    const resultKey = ["base64Encode", "base64UrlEncode"].includes(tool)
      ? "encodedValue"
      : ["base64Decode", "base64UrlDecode"].includes(tool)
        ? "decodedValue"
        : tool === "checksum" ? "checksum" : tool === "urlDecode" ? "decodedValue" : "hashedValue";
    return { [resultKey]: hashResults[tool] };
  }

  if (category === "convert") {
    const converters: Record<string, unknown> = {
      length: cfl.convertLength(numberValue(values.length), values.fromUnit, values.toUnit),
      weight: cfl.convertWeight(numberValue(values.weight), values.fromUnit, values.toUnit),
      temperature: cfl.convertTemperature(numberValue(values.temperature), values.fromUnit, values.toUnit),
      area: cfl.convertArea(numberValue(values.area), values.fromUnit, values.toUnit),
      dataSize: cfl.convertDataSize(numberValue(values.value), values.fromUnit, values.toUnit),
      speed: cfl.convertSpeed(numberValue(values.value), values.fromUnit, values.toUnit),
      pressure: cfl.convertPressure(numberValue(values.value), values.fromUnit, values.toUnit),
      numberBase: cfl.convertNumberBase(values.value, numberValue(values.fromBase), numberValue(values.toBase)),
      duration: cfl.convertDuration(numberValue(values.value), values.fromUnit, values.toUnit),
      timestamp: cfl.convertTimestamp(values.value, values.fromUnit, values.toUnit),
      color: cfl.convertColor(values.value, values.fromFormat, values.toFormat),
    };
    const resultKeys: Record<string, string> = {
      length: "convertedLength", weight: "convertedWeight", temperature: "convertedTemperature",
      area: "convertedArea", dataSize: "convertedDataSize", speed: "convertedSpeed",
      numberBase: "convertedNumber", duration: "convertedDuration", timestamp: "convertedTimestamp",
      color: "convertedColor", pressure: "convertedPressure",
    };
    return { [resultKeys[tool]]: converters[tool] };
  }

  throw new Error(`Unsupported fallback endpoint: ${endpoint}`);
};

export async function POST(request: Request) {
  try {
    let endpoint: string | undefined;
    let values: Record<string, string> = {};
    let file: { buffer: Buffer; name: string } | undefined;

    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await request.formData();
      endpoint = String(form.get("endpoint") || "");
      form.forEach((value, key) => {
        if (key !== "endpoint" && key !== "method" && typeof value === "string") {
          values[key] = value;
        }
      });
      const uploaded = form.get("file");
      if (uploaded instanceof Blob) {
        if (uploaded.size > 5 * 1024 * 1024) {
          throw new Error("SteganoPass only accepts files up to 5 MB.");
        }
        file = { buffer: Buffer.from(await uploaded.arrayBuffer()), name: uploaded.name || "file" };
      }
    } else {
      const body = (await request.json()) as { endpoint?: string; values?: Record<string, string> };
      endpoint = body.endpoint;
      values = body.values ?? {};
    }

    if (!endpoint || endpoint.startsWith("/local/")) {
      return NextResponse.json({ error: "Unsupported fallback request." }, { status: 400 });
    }

    return NextResponse.json(await runFallback(endpoint, values, file));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Fallback request failed." },
      { status: 400 }
    );
  }
}
