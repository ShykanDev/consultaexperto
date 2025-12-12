<template>
    <ion-page>
        <ion-content>

            <ion-header class="ion-no-border text-center">
                <ion-toolbar>
                    <ion-title color="primary" class="text-center">Lista de Expertos</ion-title>
                </ion-toolbar>
            </ion-header>


            <section class="bg-slate-50 text-slate-900 antialiased transition-colors duration-200 font-display w-full">   
                <article class=" mx-auto w-full flex flex-col gap-8 pb-12 overflow-x-hidden">
                    <!-- Hero Section -->
                    <section class="px-4 pt-4">
                        <div class="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 shadow-lg relative overflow-hidden group"
                            style="background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE266GzZNFl_XB2Ll22x-0f-QbqNQTNQu8V-6mskFwaH9gmrhDuRTXnBvkWXlIYYIuDwO8PnzfJj5IBsV9K9rkshoJWLx5q8rKUXrZcgMpT2lAiw5z519Fn6xEUNWKZHsqJkR9fEDXnDyxsHBE6s9rls07suChyaUKxFnjRJvW98V6hG_EyB2g299czSXPtZeTC_bjms7SrTY4sIm5DZHaKzSrFZZtfV1Z0ON2Bgl5wOUbyAunkJj5OkNZld4hqrvUzMrmNmfaqmIT')">
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent">
                            </div>
                            <div class="flex flex-col gap-3 text-left relative z-10">
                                <span
                                    class="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-bold rounded-full w-fit">#1
                                    Plataforma de Expertos</span>
                                <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Descubra
                                    Nuestros Expertos</h1>
                                <h2 class="text-slate-200 text-base font-medium leading-normal max-w-[90%]">Soluciones
                                    personalizadas y asesoramiento profesional en diversos campos.</h2>
                            </div>
                            <button
                                class="relative z-10 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-base font-bold shadow-md active:scale-95 duration-100">
                                <span class="truncate">Cargar Expertos</span>
                            </button>
                        </div>
                    </section>

                    <!-- Why Choose Us -->
                    <section class="px-4">
                        <div class="flex flex-col gap-6">
                            <h3 class="text-2xl font-bold leading-tight tracking-tight text-slate-800">¿Por qué
                                escoger nuestros expertos?</h3>
                            <div class="grid grid-cols-1 gap-4">
                                <div
                                    class="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm items-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
                                        <ion-icon :icon="checkmarkCircleOutline" class="text-[28px]"></ion-icon>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <h4 class="text-base font-bold text-slate-900">Profesionales Verificados</h4>
                                        <p class="text-slate-500 text-sm">Cada experto es verificado manualmente.</p>
                                    </div>
                                </div>
                                <div
                                    class="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm items-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
                                        <ion-icon :icon="lockClosedOutline" class="text-[28px]"></ion-icon>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <h4 class="text-base font-bold text-slate-900">Plataforma Segura</h4>
                                        <p class="text-slate-500 text-sm">Las transacciones son seguras y encriptadas.</p>
                                    </div>
                                </div>
                                <div
                                    class="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm items-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
                                        <ion-icon :icon="sparklesOutline" class="text-[28px]"></ion-icon>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <h4 class="text-base font-bold text-slate-900">Garantía de Calidad</h4>
                                        <p class="text-slate-500 text-sm">Garantizamos un asesoramiento de alta calidad.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Experts in Action -->
                    <section class="flex flex-col gap-4">
                        <div class="px-4 flex items-center justify-between">
                            <h3 class="text-2xl font-bold leading-tight tracking-tight text-slate-800">Expertos en Acción
                            </h3>
                            <a class="text-blue-600 text-sm font-bold hover:text-blue-700" href="#">Ver Todo</a>
                        </div>
                        <div
                            class="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory px-4 pb-4 gap-4">
                            <!-- Card 1 -->
                            <div
                                class="flex-none w-[280px] snap-center rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col">
                                <div class="w-full h-40 bg-slate-200 bg-center bg-cover"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuANAGIq4BEE29i-1k2GaKaeTrt4HM49pAZUBB49cGo9NzX0_HCK1sLQQKY5WHIbtlQq94JpTi8TtEIZ7xNX9HQd-OQ1SnJg0UqhZHa_ANL82Fb9FPSmqOVYV1pEGdabuD7E9pQPO9R9jGnfXdW-cSmMKs11B8O9hvsPdKpPotwDi-PzMr_1mDr2aA-obHgUpzfyRxmYxQTMaKRYoGax7Ir0BzTmTU998pTsA6azllf9iUhu21nhDZFnP4Ak5L8WPXOVHGvE5IZqYBds')">
                                </div>
                                <div class="p-4 flex flex-col gap-2">
                                    <div class="flex items-center gap-2 text-blue-600">
                                        <ion-icon :icon="briefcaseOutline" class="text-[20px]"></ion-icon>
                                        <span class="text-xs font-bold uppercase tracking-wider">Negocios</span>
                                    </div>
                                    <h4 class="font-bold text-lg text-slate-900">Estrategia Corporativa</h4>
                                    <p class="text-sm text-slate-500">Estrategia corporativa con asesoramiento experto.</p>
                                </div>
                            </div>
                            <!-- Card 2 -->
                            <div
                                class="flex-none w-[280px] snap-center rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col">
                                <div class="w-full h-40 bg-slate-200 bg-center bg-cover"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcxPvM8gD8KVxur5TLeqlCciLeNoHMt67BWGdeHx0LvnuPgb6uobMmSVP8QRJmbDe2T3noquOEtab0febZP1hRayQMtudaZux7GvsVGxcL1waNJC-RwgVqr6vZABSXP_klqQiFFciQbGbDQc6jAiMQlIcSquGkwrY4xBtGdyT_GvqqoOr3Pfn8yDjb5EUZdLrJDpipqcRff6JMO8-S7kDLfajCqz_c8SlYdqsCqabUgk8XmomutN3idECrhaaeKV3l9i_AbDf5tGBm')">
                                </div>
                                <div class="p-4 flex flex-col gap-2">
                                    <div class="flex items-center gap-2 text-blue-600">
                                        <ion-icon :icon="medkitOutline" class="text-[20px]"></ion-icon>
                                        <span class="text-xs font-bold uppercase tracking-wider">Salud</span>
                                    </div>
                                    <h4 class="font-bold text-lg text-slate-900">Consulta Médica</h4>
                                    <p class="text-sm text-slate-500">Asesoramiento médico confiable de los mejores médicos.</p>
                                </div>
                            </div>
                            <!-- Card 3 -->
                            <div
                                class="flex-none w-[280px] snap-center rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col">
                                <div class="w-full h-40 bg-slate-200 bg-center bg-cover"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9EiAr51vf7dAgMKeH9eM_pNWEw66exRNJTLJKh4h7-GMF7v_9ke6AaRlCSA32QjKMamVKdUJytbMgT3aangtTuSYEpsxanzuLlCNi1zwJbsI91CpFIZLkRsWgT7HiLPHvOw-LIciufwpqdh9Slpm59Cls2tbcrxvfaYNsA-Heg-3kGk8jyHRRST0nW-R-JNY8mj8kZqgFytw2wBvFNXneqJyjCrhe7XcfsV5erHC32nlwSXEPCw3jecfmvBG6Bl0XfN77_opWlQv3Hbni4JheW1NIgVE8LC-8bLZA7pJvcevGlnMnLffgVHX7gbwUsl6weHeEC8kq-zsJgF3hdlN2eUcH9DG4cS-3Yc-D7CY5Z_gCvxD6M3s')">
                                </div>
                                <div class="p-4 flex flex-col gap-2">
                                    <div class="flex items-center gap-2 text-blue-600">
                                        <ion-icon :icon="constructOutline" class="text-[20px]"></ion-icon>
                                        <span class="text-xs font-bold uppercase tracking-wider">Arquitectura</span>
                                    </div>
                                    <h4 class="font-bold text-lg text-slate-900">Diseño & Construcción</h4>
                                    <p class="text-sm text-slate-500">Soluciones arquitectónicas innovadoras.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Most Consulted -->
                    <section class="px-4">
                        <h3 class="text-2xl font-bold leading-tight tracking-tight mb-6 text-slate-800">Más Consultados</h3>
                        <div class="grid grid-cols-1 gap-4">
                            <div
                                class="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                                <div class="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 shadow-sm"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA34Ywf1odyWanj22mPGCZBD_Gq6IKGUa3CsTSQVSJShvmDhd8DWIpIJr_TMo9R6gcxyfkff83qFQy3SBq9IDpeVfX-P_Pfx805Mj2ygNerRNb_qmL7hy8MeNht0APGHDC_ZX15JCx8FT2-8xUyNAFYai_MClo9zSx-GXlqUIbnYKemwWWl8xgzpjamLWaok1tIi-7nYSY_NoTfauxV-n739phPi5TA6TrszUBBW-U1xnYmEL6-wOWlqpqCi7J0_Q0y-7qRVxhjDbXN')">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-lg truncate text-slate-900">Importación y Exportación</h4>
                                    <p class="text-xs text-slate-500 truncate">Logística y Aduanas</p>
                                </div>
                                <button
                                    class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors">Consultar</button>
                            </div>
                            <div
                                class="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                                <div class="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 shadow-sm"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa2OL1YAzqsvSO20F9-0S8qljVB0GG5XFN4FIkSHJMFp2M-qJvCXSmeXChWOyDrEkoLoukcUDgRwW9Sk-fuuVNfezBRIS_D1nwZFFl_WGr50NbyAC3XJ-YPXVZoOz8HOfC3h_Psov7HJQm-eP9d0vhpaSIGXtpMiBqbWUNBny3PZJWX21IOPmFb73BmmGslEeR6KQb-8TlZD2nd9bhmEXULfSeCdq7ssVIQXp-A7aMzktprZRGEOD4Q8vsTipXkQOVhk77TP2s22BH')">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-lg truncate text-slate-900">Asesoramiento Legal</h4>
                                    <p class="text-xs text-slate-500 truncate">Derecho Civil & Corporativo</p>
                                </div>
                                <button
                                    class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors">Consultar</button>
                            </div>
                            <div
                                class="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                                <div class="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 shadow-sm"
                                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfqz9tzhvU-vY6SLwkaeB9deGyXr08kcSX7H10hvGJBqDlOzrmYmh5g4ikjhgxOk26cG1BwA3d-qWvmF8X1bRVbpTUkWruDfH9X6861znHvO4I0yuYoO3Bd5a_lgajqpfjP4v5Cr8DHi_gCvxY70AUR7eVLmQ8qKppqRGcTnrQA1oPBEtrPOPg5AFtK3fZGxgeSzgcVmVjei31gCbIyj6K0PbN_zPg_DXUJekKtLp7GrmnwddAblkwNI87PcY9_uJItIc495YqvVge')">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-lg truncate text-slate-900">Medicina</h4>
                                    <p class="text-xs text-slate-500 truncate">Consulta Especializada</p>
                                </div>
                                <button
                                    class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors">Consultar</button>
                            </div>
                        </div>
                    </section>

                    <!-- Advertisement Banner 1 -->
                    <section class="px-4 py-2">
                        <div class="rounded-xl overflow-hidden bg-indigo-900 text-white relative shadow-lg">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-90">
                            </div>
                            <div class="absolute inset-0 opacity-20"
                                style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px;">
                            </div>
                            <div class="relative z-10 p-6 flex items-center justify-between gap-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-xs font-bold text-indigo-200 tracking-wider">Anuncio</span>
                                    <h4 class="text-xl font-bold">miexpareja.net</h4>
                                    <p class="text-indigo-200 text-xs">Asesoramiento de relaciones & más.</p>
                                </div>
                                <a class="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap"
                                    href="#">Ver sitio</a>
                            </div>
                        </div>
                    </section>

                    <!-- Areas of Specialization Grid -->
                    <section class="px-4">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold leading-tight tracking-tight text-slate-800">Áreas de Especialización</h3>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <!-- Accountant -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="calculatorOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Contador</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Architect -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="constructOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Arquitecto</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Web Services -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="globeOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Servicios Web</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Advertising -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="desktopOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Publicidad</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Translator -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="languageOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Traductor</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Expertise -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="schoolOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Experto</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Comp. Eng. -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="terminalOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Ingeniero en Sistemas</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Management -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="folderOpenOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Marketing</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                       
                            <!-- Lawyer -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="hammerOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Abogado</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Psychologist -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="happyOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Psicólogo/a</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Teacher -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="easelOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Profesor/a</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                            <!-- Chef -->
                            <div
                                class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ion-icon :icon="restaurantOutline" class="text-[24px]"></ion-icon>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <h4 class="font-bold text-base leading-tight text-slate-900">Chef</h4>
                                    <button
                                        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">Consultar</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Advertisement Banner 2 -->
                    <section class="px-4 py-2">
                        <div class="rounded-xl overflow-hidden bg-emerald-900 text-white relative shadow-lg">
                            <div class="absolute inset-0 bg-gradient-to-r from-teal-900 to-emerald-900 opacity-90">
                            </div>
                            <div
                                class="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 transform origin-bottom-left">
                            </div>
                            <div class="relative z-10 p-6 flex items-center justify-between gap-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-xs font-bold text-emerald-200 tracking-wider">Anuncios</span>
                                    <h4 class="text-xl font-bold">miarrendatario.com</h4>
                                    <p class="text-emerald-200 text-xs">Arrende o contrate expertos.</p>
                                </div>
                                <a class="bg-white text-emerald-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors whitespace-nowrap"
                                    href="#">Ir al sitio web</a>
                            </div>
                        </div>
                    </section>

                    <!-- Testimonials -->
                    <section class="px-4 py-4 bg-blue-50 -mx-4 sm:mx-0 sm:rounded-xl my-4">
                        <div class="px-4 sm:px-0 mb-6 text-center">
                            <h3 class="text-2xl font-bold leading-tight tracking-tight text-slate-900">Que opinan nuestros clientes</h3>
                            <p class="text-sm text-slate-600 mt-2">Testimonios de clientes.</p>
                        </div>
                        <div
                            class="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory px-4 pb-4 gap-4">
                            <!-- Testimonial 1 -->
                            <div
                                class="flex-none w-[300px] snap-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div class="flex items-center gap-1 text-yellow-400 mb-3">
                                    <ion-icon :icon="star" v-for="i in 5" :key="i" class="text-[20px]"></ion-icon>
                                   
                                </div>
                                <p class="text-slate-800 text-sm italic mb-4">"Encontré un asesor excelente que me ayudó a resolver un problema complejo. Me dio mucha información valiosa y me dio la confianza para tomar decisiones importantes."</p>
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center"
                                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCM0O-8rxQqXgI7kaq_y7dKQClgRruuGwSvK1xYOnAI23218s0in5yizwTV7dimYtiMp9tWTKhiw1EFCcmMXfkqs2VVFr3jBrajtMyMYP-DpJii3exJe2btCdIWdmYr15XLsiYc_Ct7LC-qN2btM9a20Y2SWtz0gsnpEtUwpIDmOB89G-dqW9pItfnZk79zMK-Yeyf-1Amr2xs6fXoEWs0cZTq9NTFi69v1XcEbeJ13QG0IJJhKZYbbwniT-JSVIa6KH33pchOzRrFE')">
                                    </div>
                                    <div class="text-sm">
                                        <p class="font-bold text-slate-900">Jorge Ahumada</p>
                                        <p class="text-slate-500 text-xs">Consultor</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Testimonial 2 -->
                            <div
                                class="flex-none w-[300px] snap-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div class="flex items-center gap-1 text-yellow-400 mb-3">
                                    <ion-icon :icon="star" v-for="i in 5" :key="i" class="text-[20px]"></ion-icon>
                                </div>
                                <p class="text-slate-800 text-sm italic mb-4">"El asesoramiento legal que me brindaron fue excelente. Me ayudaron a resolver un problema complejo y me dieron la confianza para tomar decisiones importantes."</p>
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center"
                                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLdaZWNNuk89MZ9pKzLf6xnIbWD4pTZQPyhF1-DXDgNEqfcL7ryj06a3bWD55TkDW6N9WdzJ4iYjyHRRST0nW-R-JNY8mj8kZqgFytw2wBvFNXneqJyjCrhe7XcfsV5erHC32nlwSXEPCw3jecfmvBG6Bl0XfN77_opWlQv3Hbni4JheW1NIgVE8LC-8bLZA7pJvcevGlnMnLffgVHX7gbwUsl6weHeEC8kq-zsJgF3hdlN2eUcH9DG4cS-3Yc-D7CY5Z_gCvxD6M3s')">
                                    </div>
                                    <div class="text-sm">
                                        <p class="font-bold text-slate-900">Carlos Montiel</p>
                                        <p class="text-slate-500 text-xs">Freelancer</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Testimonial 3 -->
                            <div
                                class="flex-none w-[300px] snap-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div class="flex items-center gap-1 text-yellow-400 mb-3">
                                    <ion-icon :icon="star" v-for="i in 5" :key="i" class="text-[20px]"></ion-icon>
                                </div>
                                <p class="text-slate-800 text-sm italic mb-4">"Increible plataforma para encontrar
                                    especialistas. Uso para mi restaurante todo el tiempo."</p>
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center"
                                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqGX9gk3uZGChT2tWucsL40YKPHne-IIQJ9bQYqpkzXi2PGalB-TeRO2soyc0owyqON8O2GJigR5cWmJLgHVSnes7Pc7StA-0_DMEGd24xDl3vUuLYpKy0PCaWNHBNQhkeGw-BtZMpLHW6RAZnluPAGQGHRBDzwMNOv3nrfk87ZnyWK93KmtCPysnuVCqRJxPpsOmwJYFvRLKylDBaKFcsFXuOlJk589DGG7GxIBZWz0_CEfzAirxmoXIzFJuz6tIiapAb4C9TwiGM')">
                                    </div>
                                    <div class="text-sm">
                                        <p class="font-bold text-slate-900">Vanessa Cervantes</p>
                                        <p class="text-slate-500 text-xs">Dueña de un restaurante</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- CTA Section -->
                    <section class="px-4 py-8 text-center">
                        <h2 class="text-3xl font-black mb-3 text-slate-900">¿Listo para comenzar?</h2>
                        <p class="text-slate-500 mb-8 max-w-xs mx-auto">Conecta con expertos en todo momento.</p>
                        <div class="flex flex-col gap-3 max-w-xs mx-auto">
                            <button
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-lg shadow-lg active:scale-95 transition-all">Registrarse</button>
                            <button
                                class="w-full bg-transparent border-2 border-slate-200 hover:border-blue-600 text-slate-900 font-bold h-12 rounded-lg active:scale-95 transition-all">Contactar</button>
                        </div>
                    </section>

                    <!-- Footer -->
                    <footer class="bg-white border-t border-slate-200 pt-10 pb-10 px-6 mt-4">
                        <div class="flex flex-col gap-8 max-w-lg mx-auto">
                            <div class="flex flex-col gap-4">
                                <h2 class="text-xl font-black text-slate-900">Conoce a nuestros expertos</h2>   
                                <p class="text-sm text-slate-500">Conecta con expertos en todo momento.</p>
                            </div>
                            <div class="grid grid-cols-2 gap-8 text-sm">
                                <div class="flex flex-col gap-3">
                                    <h4 class="font-bold text-slate-900">Legal</h4>
                                    <a class="text-slate-500 hover:text-blue-600" href="#">Política de privacidad</a>
                                    <a class="text-slate-500 hover:text-blue-600" href="#">Términos y condiciones</a>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <h4 class="font-bold text-slate-900">Contact</h4>
                                    <a class="text-slate-500 hover:text-blue-600" href="#">Soporte</a>
                                    <a class="text-slate-500 hover:text-blue-600" href="#">Unirse como experto</a>
                                </div>
                            </div>
                            <div class="pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                                <p class="text-xs text-slate-400 text-center">© 2025 Consulta Experto. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </footer>
                </article>
            </section>
        </ion-content>
    </ion-page>

</template>

<script lang="ts" setup>
import { IonIcon, IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import {
    menuOutline,
    checkmarkCircleOutline,
    lockClosedOutline,
    sparklesOutline,
    briefcaseOutline,
    medkitOutline,
    constructOutline,
    calculatorOutline,
    globeOutline,
    desktopOutline,
    languageOutline,
    schoolOutline,
    terminalOutline,
    folderOpenOutline,
    megaphoneOutline,
    hammerOutline,
    happyOutline,
    easelOutline,
    restaurantOutline,
    star,
    starHalf
} from 'ionicons/icons';
</script>

<style scoped>
/* Scoped styles if needed, currently mainly using Tailwind */
</style>