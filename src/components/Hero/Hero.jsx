import { 
  Camera, 
  Clapperboard, 
  Play, 
  Star, 
  Eye, 
  Heart 
} from "lucide-react";
import { useApi } from "../../context/ApiContext";
import { useEffect } from "react";

function Hero() {
  const { heroMovies, fetchHeroMovies, getImageUrl } = useApi();

  useEffect(() => {
    fetchHeroMovies();
  }, []);

  const scrollDown = () => {
    if (window.innerWidth >= 768) {
      window.scrollBy(0, 900);
    } else {
      window.scrollBy(0, 1500);
    }
  };

  return (
    <div className="mt-20">
      <section className="relative py-16 md:py-24 film-grain">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-5xl mx-auto">

            <h2 className="text-5xl md:text-7xl font-title font-bold text-white mb-6">Tu universo <span className="text-main">cinematográfico</span> personal</h2>
            <p className="text-xl md:text-2xl mb-12 font-text text-white">
              Lleva registro. Crea listas. Descubre nuevas historias.
            </p>

            <button 
              onClick={scrollDown}
              className="bg-main hover:bg-main/90 text-white px-12 py-4 rounded-xl font-text text-4xl font-semibold tracking-wide transition-colors"
            >
              COMENZAR
            </button>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {heroMovies.length > 0 ? (
              heroMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="aspect-[2/3] rounded-lg overflow-hidden relative group cursor-pointer"
                  style={{
                    backgroundImage: `url(${getImageUrl(movie.poster_path)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-2xl line-clamp-2 font-text">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <span className="text-white/80 text-md">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback loading/placeholder cards
              Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg overflow-hidden relative animate-pulse"
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-6 bg-gray-600 rounded mb-2"></div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <div className="w-8 h-4 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-white">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Eye className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lleva registro</h3>
              <p className="text-muted-foreground">
                Marca las películas que has visto y calíficalas
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crea listas</h3>
              <p className="text-muted-foreground">
                Guarda lo que quieres ver próximamente
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Star className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Descubre</h3>
              <p className="text-muted-foreground">
                Encuentra tu próxima película favorita
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
