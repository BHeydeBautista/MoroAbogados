"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const lawyers = [
	{
		slug: "dr-carlos-moro",
		name: "Dr. Carlos Moro",
		title: "",
		description:
			"El secreto de nuestra firma radica en abordar extraordinariamente bien los puntos clave del asesoramiento jurídico",
		image: "/img/lawyer1.jpg",
	},
	{
		slug: "dr-emilio-f-moro",
		name: "Dr. Emilio F. Moro",
		title: "",
		description: "Biografía/frase",
		image: "/img/lawyer1.jpg",
	},
];

const LawyersShowcaseEnhanced = () => {
	const ref = useRef<HTMLElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(-1);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.18]);
	const titleOpacity = useTransform(scrollYProgress, [0.18, 0.28], [1, 0]);
	const cardsContainerOpacity = useTransform(
		scrollYProgress,
		[0.25, 0.4],
		[0, 1]
	);
	const cardsContainerY = useTransform(scrollYProgress, [0.25, 0.4], [30, 0]);

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((value) => {
			// Normalizo usando start/end más compactos para que las cards aparezcan antes
			const start = 0.18;
			const end = 0.82;
			if (value < start) {
				setActiveIndex(-1);
				return;
			}
			const normalized = Math.min(
				1,
				Math.max(0, (value - start) / (end - start))
			);
			const idx = Math.floor(normalized * lawyers.length);
			setActiveIndex(Math.min(lawyers.length - 1, idx));
		});

		return () => unsubscribe();
	}, [scrollYProgress]);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current) {
				const viewportHeight = window.innerHeight;
				// Reducimos la altura total: antes era *6, ahora lo hacemos dinámico y mucho menor
				const base = Math.max(1.8, 1.6 + lawyers.length * 0.6); // por ejemplo: 2.8 para 2 lawyers
				const optimalHeight = Math.round(viewportHeight * base);
				(ref.current as HTMLElement).style.height = `${optimalHeight}px`;
			}
		};

		updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, []);

	// Si se llega con hash #Profesionales: forzar mostrar la primera card y ajustar scroll
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.location.hash === "#Profesionales") {
			// darle tiempo a layout y luego desplazar un poco para activar la zona de tarjetas
			setTimeout(() => {
				const el = ref.current;
				if (!el) return;
				// calculo una posición dentro de la sección para que las cards sean visibles de inmediato
				const top =
					el.getBoundingClientRect().top +
					window.scrollY +
					Math.round(window.innerHeight * 0.18);
				window.scrollTo({ top, behavior: "smooth" });
				setActiveIndex(0);
			}, 120);
		}
	}, []);

	// helper: small programmatic scroll when user clicks the hint
	const triggerScroll = () => {
		if (!ref.current) return;
		const el = ref.current;
		const top =
			el.getBoundingClientRect().top +
			window.scrollY +
			Math.round(window.innerHeight * 0.18) +
			40;
		window.scrollTo({ top, behavior: "smooth" });
	};

	return (
		<section
			ref={ref}
			className="relative"
			id="Profesionales"
			aria-label="Sección de profesionales"
		>
			<div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#0F1C2E] to-black z-0" />
			<div className="absolute bottom-0 w-full h-[25vh]" />
			<div className="sticky top-0 left-0 w-full h-[100dvh] py-8 flex items-center justify-center z-10 overflow-hidden">
				<div className="flex flex-col items-center justify-center w-full h-full relative">
					<motion.h2
						style={{ scale: titleScale, opacity: titleOpacity }}
						className="text-3xl md:text-5xl font-bold text-center mb-6 text-white drop-shadow-lg"
					>
						Moro Abogados
					</motion.h2>

					{/* Indicator: aparece cuando activeIndex === -1 */}
					{activeIndex === -1 && (
						<motion.button
							onClick={triggerScroll}
							aria-label="Desplazá hacia abajo para interactuar"
							initial={{ opacity: 1 }}
							animate={{ y: [0, 8, 0] }}
							transition={{ repeat: Infinity, duration: 1.6 }}
							className="absolute bottom-10 flex flex-col items-center gap-2 bg-transparent border-0"
						>
							<span className="text-sm text-gray-200/90 select-none">
								Desplazá para interactuar
							</span>

							<span
								className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/16 transition cursor-pointer"
								role="img"
								aria-hidden
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="text-white"
								>
									<path
										d="M6 9l6 6 6-6"
										stroke="white"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</motion.button>
					)}

					<motion.div
						style={{ opacity: cardsContainerOpacity, y: cardsContainerY }}
						className="w-full px-4 md:px-12"
					>
						<div className="flex justify-center items-center">
							{activeIndex >= 0 && (
								<motion.div
									key={activeIndex}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -30 }}
									transition={{ duration: 0.45 }}
									className="w-full max-w-xl mx-auto"
								>
									<div className="flex flex-col items-center text-center bg-gradient-to-b from-[#0F1C2E] to-black rounded-lg overflow-hidden shadow-2xl border-2 border-[#D4A75D]/60 p-6 md:p-8">
										<div className="w-28 h-28 mb-4 md:mb-6">
											<Image
												src={lawyers[activeIndex].image}
												alt={lawyers[activeIndex].name}
												width={128}
												height={128}
												className="w-28 h-28 rounded-full object-cover border-2 border-[#D4A75D]/70 shadow-md"
												priority
											/>
										</div>

										<h3 className="text-lg md:text-2xl font-bold text-[#D4A75D]">
											{lawyers[activeIndex].name}
										</h3>
										<p className="text-sm md:text-base text-gray-400 mb-3">
											{lawyers[activeIndex].title}
										</p>

										<p className="text-sm md:text-base font-light leading-relaxed text-white/90 mb-4 md:mb-6">
											{lawyers[activeIndex].description}
										</p>

										<Link
											href={`/abogados/${lawyers[activeIndex].slug}`}
											className="inline-block px-5 py-2 border border-[#D4A75D] text-sm rounded-md hover:bg-[#D4A75D] hover:text-black transition duration-300"
										>
											Ver más
										</Link>
									</div>
								</motion.div>
							)}
						</div>

						<div className="flex justify-center mt-4 gap-3">
							{lawyers.map((_, idx) => (
								<div
									key={idx}
									className={`w-3 h-3 rounded-full ${
										idx === activeIndex ? "bg-[#D4A75D]" : "bg-gray-600"
									}`}
								/>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default LawyersShowcaseEnhanced;
