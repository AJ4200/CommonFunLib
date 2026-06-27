import "@/styles/globals.css";
import "@/styles/loader.css";
import AppChromeManager from "@/components/pwa/AppChromeManager";
import type { Metadata, Viewport } from "next";
import {
  Anton,
  Archivo_Black,
  Audiowide,
  Bangers,
  Bebas_Neue,
  Black_Ops_One,
  Boogaloo,
  Bungee,
  Carter_One,
  Caveat,
  Changa_One,
  Chewy,
  Cinzel,
  Codystar,
  Coiny,
  Comic_Neue,
  DM_Serif_Display,
  DynaPuff,
  Exo_2,
  Faster_One,
  Finger_Paint,
  Flavors,
  Freckle_Face,
  Fredoka,
  Fugaz_One,
  Germania_One,
  Graduate,
  Henny_Penny,
  JetBrains_Mono,
  Jolly_Lodger,
  Kablammo,
  Knewave,
  Luckiest_Guy,
  Major_Mono_Display,
  Merienda,
  Metal_Mania,
  Monoton,
  New_Rocker,
  Nunito,
  Oleo_Script,
  Orbitron,
  Oxanium,
  Pacifico,
  Permanent_Marker,
  Pirata_One,
  Playfair_Display,
  Plaster,
  Poiret_One,
  Prata,
  Press_Start_2P,
  Rammetto_One,
  Rancho,
  Righteous,
  Rubik_Bubbles,
  Rubik_Dirt,
  Rubik_Glitch,
  Rye,
  Shojumaru,
  Silkscreen,
  Slackey,
  Space_Mono,
  Special_Elite,
  Tilt_Neon,
  Titan_One,
  Trade_Winds,
  Unbounded,
  VT323,
  Wallpoet,
  Zilla_Slab_Highlight,
} from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: "400",
  display: "swap",
});

const chewy = Chewy({
  subsets: ["latin"],
  variable: "--font-chewy",
  weight: "400",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  display: "swap",
});

const freckleFace = Freckle_Face({
  subsets: ["latin"],
  variable: "--font-freckle-face",
  weight: "400",
  display: "swap",
});

const kablammo = Kablammo({
  subsets: ["latin"],
  variable: "--font-kablammo",
  display: "swap",
});

const monoton = Monoton({
  subsets: ["latin"],
  variable: "--font-monoton",
  weight: "400",
  display: "swap",
});

const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  variable: "--font-rubik-bubbles",
  weight: "400",
  display: "swap",
});

const rubikGlitch = Rubik_Glitch({
  subsets: ["latin"],
  variable: "--font-rubik-glitch",
  weight: "400",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
  weight: "400",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  weight: "400",
  display: "swap",
});

const pressStart2p = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  weight: "400",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: "400",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600", "700"],
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
  display: "swap",
});

const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-bungee",
  weight: "400",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-special-elite",
  weight: "400",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  weight: "400",
  display: "swap",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  variable: "--font-audiowide",
  weight: "400",
  display: "swap",
});

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  variable: "--font-black-ops-one",
  weight: "400",
  display: "swap",
});

const boogaloo = Boogaloo({
  subsets: ["latin"],
  variable: "--font-boogaloo",
  weight: "400",
  display: "swap",
});

const carterOne = Carter_One({
  subsets: ["latin"],
  variable: "--font-carter-one",
  weight: "400",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: "400",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo-2",
  weight: ["400", "600", "800"],
  display: "swap",
});

const fasterOne = Faster_One({
  subsets: ["latin"],
  variable: "--font-faster-one",
  weight: "400",
  display: "swap",
});

const fugazOne = Fugaz_One({
  subsets: ["latin"],
  variable: "--font-fugaz-one",
  weight: "400",
  display: "swap",
});

const graduate = Graduate({
  subsets: ["latin"],
  variable: "--font-graduate",
  weight: "400",
  display: "swap",
});

const knewave = Knewave({
  subsets: ["latin"],
  variable: "--font-knewave",
  weight: "400",
  display: "swap",
});

const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-merienda",
  weight: ["400", "700", "900"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "700", "900"],
  display: "swap",
});

const poiretOne = Poiret_One({
  subsets: ["latin"],
  variable: "--font-poiret-one",
  weight: "400",
  display: "swap",
});

const prata = Prata({
  subsets: ["latin"],
  variable: "--font-prata",
  weight: "400",
  display: "swap",
});

const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  variable: "--font-rubik-dirt",
  weight: "400",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const titanOne = Titan_One({
  subsets: ["latin"],
  variable: "--font-titan-one",
  weight: "400",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "600", "800"],
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
  display: "swap",
});

const changaOne = Changa_One({
  subsets: ["latin"],
  variable: "--font-changa-one",
  weight: "400",
  display: "swap",
});

const codystar = Codystar({
  subsets: ["latin"],
  variable: "--font-codystar",
  weight: "400",
  display: "swap",
});

const coiny = Coiny({
  subsets: ["latin"],
  variable: "--font-coiny",
  weight: "400",
  display: "swap",
});

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  variable: "--font-dynapuff",
  weight: ["400", "600", "700"],
  display: "swap",
});

const fingerPaint = Finger_Paint({
  subsets: ["latin"],
  variable: "--font-finger-paint",
  weight: "400",
  display: "swap",
});

const flavors = Flavors({
  subsets: ["latin"],
  variable: "--font-flavors",
  weight: "400",
  display: "swap",
});

const germaniaOne = Germania_One({
  subsets: ["latin"],
  variable: "--font-germania-one",
  weight: "400",
  display: "swap",
});

const hennyPenny = Henny_Penny({
  subsets: ["latin"],
  variable: "--font-henny-penny",
  weight: "400",
  display: "swap",
});

const jollyLodger = Jolly_Lodger({
  subsets: ["latin"],
  variable: "--font-jolly-lodger",
  weight: "400",
  display: "swap",
});

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  variable: "--font-major-mono-display",
  weight: "400",
  display: "swap",
});

const metalMania = Metal_Mania({
  subsets: ["latin"],
  variable: "--font-metal-mania",
  weight: "400",
  display: "swap",
});

const newRocker = New_Rocker({
  subsets: ["latin"],
  variable: "--font-new-rocker",
  weight: "400",
  display: "swap",
});

const oleoScript = Oleo_Script({
  subsets: ["latin"],
  variable: "--font-oleo-script",
  weight: ["400", "700"],
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  weight: ["400", "600", "800"],
  display: "swap",
});

const pirataOne = Pirata_One({
  subsets: ["latin"],
  variable: "--font-pirata-one",
  weight: "400",
  display: "swap",
});

const plaster = Plaster({
  subsets: ["latin"],
  variable: "--font-plaster",
  weight: "400",
  display: "swap",
});

const rammettoOne = Rammetto_One({
  subsets: ["latin"],
  variable: "--font-rammetto-one",
  weight: "400",
  display: "swap",
});

const rancho = Rancho({
  subsets: ["latin"],
  variable: "--font-rancho",
  weight: "400",
  display: "swap",
});

const rye = Rye({
  subsets: ["latin"],
  variable: "--font-rye",
  weight: "400",
  display: "swap",
});

const shojumaru = Shojumaru({
  subsets: ["latin"],
  variable: "--font-shojumaru",
  weight: "400",
  display: "swap",
});

const slackey = Slackey({
  subsets: ["latin"],
  variable: "--font-slackey",
  weight: "400",
  display: "swap",
});

const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  variable: "--font-tilt-neon",
  weight: "400",
  display: "swap",
});

const tradeWinds = Trade_Winds({
  subsets: ["latin"],
  variable: "--font-trade-winds",
  weight: "400",
  display: "swap",
});

const wallpoet = Wallpoet({
  subsets: ["latin"],
  variable: "--font-wallpoet",
  weight: "400",
  display: "swap",
});

const zillaSlabHighlight = Zilla_Slab_Highlight({
  subsets: ["latin"],
  variable: "--font-zilla-slab-highlight",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CommonFunLib",
  description: "Developer utility playground for CommonFunLib APIs.",
  applicationName: "CommonFunLib",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CommonFunLib",
  },
  icons: {
    icon: [
      {
        url: "/api/app-icon?size=32&secondary=%234682B4&background=%23A9A9A9",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/api/app-icon?size=192&secondary=%234682B4&background=%23A9A9A9",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/api/app-icon?size=180&secondary=%234682B4&background=%23A9A9A9",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#4682B4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    nunito.variable,
    jetBrainsMono.variable,
    bangers.variable,
    chewy.variable,
    comicNeue.variable,
    freckleFace.variable,
    kablammo.variable,
    monoton.variable,
    rubikBubbles.variable,
    rubikGlitch.variable,
    silkscreen.variable,
    fredoka.variable,
    luckiestGuy.variable,
    permanentMarker.variable,
    pressStart2p.variable,
    righteous.variable,
    orbitron.variable,
    caveat.variable,
    pacifico.variable,
    bungee.variable,
    specialElite.variable,
    anton.variable,
    archivoBlack.variable,
    audiowide.variable,
    blackOpsOne.variable,
    boogaloo.variable,
    carterOne.variable,
    cinzel.variable,
    dmSerifDisplay.variable,
    exo2.variable,
    fasterOne.variable,
    fugazOne.variable,
    graduate.variable,
    knewave.variable,
    merienda.variable,
    playfairDisplay.variable,
    poiretOne.variable,
    prata.variable,
    rubikDirt.variable,
    spaceMono.variable,
    titanOne.variable,
    unbounded.variable,
    vt323.variable,
    bebasNeue.variable,
    changaOne.variable,
    codystar.variable,
    coiny.variable,
    dynaPuff.variable,
    fingerPaint.variable,
    flavors.variable,
    germaniaOne.variable,
    hennyPenny.variable,
    jollyLodger.variable,
    majorMonoDisplay.variable,
    metalMania.variable,
    newRocker.variable,
    oleoScript.variable,
    oxanium.variable,
    pirataOne.variable,
    plaster.variable,
    rammettoOne.variable,
    rancho.variable,
    rye.variable,
    shojumaru.variable,
    slackey.variable,
    tiltNeon.variable,
    tradeWinds.variable,
    wallpoet.variable,
    zillaSlabHighlight.variable,
  ].join(" ");

  return (
    <html lang="en">
      <body className={fontVariables}>
        <AppChromeManager />
        {children}
      </body>
    </html>
  );
}
