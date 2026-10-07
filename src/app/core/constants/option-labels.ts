export interface FilterOption {
  value: string,
  label: string
}

export const ORDER_OPTIONS: FilterOption[] = [
  { value: 'default', label: 'Por defecto' },
  { value: 'score', label: 'Puntuación' },
  { value: 'popular', label: 'Popular' },
  { value: 'title', label: 'Título' },
  { value: 'latest_added', label: 'Últimos agregados' },
  { value: 'latest_released', label: 'Últimos estrenos' },
]

export const GENRES_OPTIONS: FilterOption[] = [
  { value: 'accion', label: 'Acción' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'ciencia-ficcion', label: 'Ciencia Ficción' },
  { value: 'comedia', label: 'Comedia' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasia', label: 'Fantasía' },
  { value: 'misterio', label: 'Misterio' },
  { value: 'recuentos-de-la-vida', label: 'Recuentos de la Vida' },
  { value: 'romance', label: 'Romance' },
  { value: 'seinen', label: 'Seinen' },
  { value: 'shoujo', label: 'Shoujo' },
  { value: 'shounen', label: 'Shounen' },
  { value: 'sobrenatural', label: 'Sobrenatural' },
  { value: 'suspenso', label: 'Suspenso' },
  { value: 'terror', label: 'Terror' },
  { value: 'antropomorfico', label: 'Antropomórfico' },
  { value: 'artes-marciales', label: 'Artes Marciales' },
  { value: 'carreras', label: 'Carreras' },
  { value: 'detectives', label: 'Detectives' },
  { value: 'ecchi', label: 'Ecchi' },
  { value: 'elenco-adulto', label: 'Elenco Adulto' },
  { value: 'escolares', label: 'Escolares' },
  { value: 'espacial', label: 'Espacial' },
  { value: 'gore', label: 'Gore' },
  { value: 'gourmet', label: 'Gourmet' },
  { value: 'harem', label: 'Harem' },
  { value: 'historico', label: 'Histórico' },
  { value: 'idols-hombre', label: 'Idols (Hombre)' },
  { value: 'idols-mujer', label: 'Idols (Mujer)' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'isekai', label: 'Isekai' },
  { value: 'josei', label: 'Josei' },
  { value: 'juegos-estrategia', label: 'Juegos de Estrategia' },
  { value: 'mahou-shoujo', label: 'Mahou Shoujo' },
  { value: 'mecha', label: 'Mecha' },
  { value: 'militar', label: 'Militar' },
  { value: 'mitologia', label: 'Mitología' },
  { value: 'musica', label: 'Música' },
  { value: 'parodia', label: 'Parodia' },
  { value: 'psicologico', label: 'Psicológico' },
  { value: 'samurai', label: 'Samurai' },
  { value: 'shoujo-ai', label: 'Shoujo Ai' },
  { value: 'shounen-ai', label: 'Shounen Ai' },
  { value: 'superpoderes', label: 'Superpoderes' },
  { value: 'vampiros', label: 'Vampiros' },
];

export const CATEGORY_OPTIONS: FilterOption[] = [
  { value: 'tv-anime' , label: 'TV Anime' },
  { value: 'pelicula' , label: 'Película' },
  { value: 'especial' , label: 'Especial' },
  { value: 'ova' , label: 'OVA' },
  { value: 'ona' , label: 'ONA' },
]

export const STATUS_OPTIONS: FilterOption[] = [
  { value: 'emision', label: 'Emisión'},
  { value: 'finalizado', label: 'Finalizado'},
  { value: 'proximamente', label: 'Próximamente'},
]
