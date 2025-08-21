'use client'

import { useState, useEffect, useRef } from 'react'

// SVGアイコンコンポーネント
const PlayIcon = () => (
  <svg className="inline-block w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const CameraIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
  </svg>
)

const VideoIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
)

export default function VideoProductionLP() {
  const [activeTab, setActiveTab] = useState('2d')
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    portfolio: false,
    stats: false,
    contact: false
  })

  // 3Dオブジェクトのアニメーション
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // 一つの大きな3Dキューブを描画
      drawCube(ctx, centerX, centerY, rotation, 300)
      
      rotation += 0.005
      animationId = requestAnimationFrame(animate)
    }

    const drawCube = (ctx, x, y, rotation, size) => {
      ctx.save()
      ctx.translate(x, y)
      
      // 3D変換のための計算
      const cos = Math.cos(rotation)
      const sin = Math.sin(rotation)
      const cosY = Math.cos(rotation * 0.7) // Y軸回転を少し遅く
      const sinY = Math.sin(rotation * 0.7)
      
      // 立方体の頂点を定義
      const vertices = [
        [-size/2, -size/2, -size/2], // 0: 左上奥
        [size/2, -size/2, -size/2],  // 1: 右上奥
        [size/2, size/2, -size/2],   // 2: 右下奥
        [-size/2, size/2, -size/2],  // 3: 左下奥
        [-size/2, -size/2, size/2],  // 4: 左上手前
        [size/2, -size/2, size/2],   // 5: 右上手前
        [size/2, size/2, size/2],    // 6: 右下手前
        [-size/2, size/2, size/2]    // 7: 左下手前
      ]
      
      // 3D変換を適用
      const projected = vertices.map(([x, y, z]) => {
        // Y軸とZ軸の回転を適用
        const rotatedX = x * cosY - z * sinY
        const rotatedZ = x * sinY + z * cosY
        const rotatedY = y * cos - rotatedZ * sin
        const finalZ = y * sin + rotatedZ * cos
        
        // 遠近感のある投影
        const perspective = 1000
        const distance = perspective + finalZ
        const projectedX = (rotatedX * perspective) / distance
        const projectedY = (rotatedY * perspective) / distance
        
        return [projectedX, projectedY, distance]
      })
      
      // 面を定義（頂点のインデックス）
      const faces = [
        { vertices: [4, 5, 6, 7], color: 'rgba(59, 130, 246, 0.7)' },   // 手前面（青）
        { vertices: [1, 0, 3, 2], color: 'rgba(30, 64, 175, 0.5)' },    // 奥面（濃い青）
        { vertices: [5, 1, 2, 6], color: 'rgba(139, 92, 246, 0.6)' },   // 右面（紫）
        { vertices: [0, 4, 7, 3], color: 'rgba(88, 28, 135, 0.4)' },    // 左面（濃い紫）
        { vertices: [0, 1, 5, 4], color: 'rgba(34, 197, 94, 0.6)' },    // 上面（緑）
        { vertices: [3, 7, 6, 2], color: 'rgba(22, 163, 74, 0.4)' }     // 下面（濃い緑）
      ]
      
      // Z軸でソートして正しい描画順序にする
      faces.sort((a, b) => {
        const avgZA = a.vertices.reduce((sum, i) => sum + projected[i][2], 0) / 4
        const avgZB = b.vertices.reduce((sum, i) => sum + projected[i][2], 0) / 4
        return avgZA - avgZB
      })
      
      // 面を描画
      faces.forEach(face => {
        ctx.beginPath()
        face.vertices.forEach((vertexIndex, i) => {
          const [x, y] = projected[vertexIndex]
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.closePath()
        ctx.fillStyle = face.color
        ctx.fill()
        
        // エッジを描画
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.lineWidth = 2
        ctx.stroke()
      })
      
      ctx.restore()
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setIsVisible(prev => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // YouTubeの動画ID（実際の動画IDに置き換えてください）
  const videoIds = {
    '2d': [
      'dQw4w9WgXcQ', // 例：Rick Astley - Never Gonna Give You Up
      'L_jWHffIx5E', // 例：Smashmouth - All Star
      'fJ9rUzIMcZQ', // 例：Queen - Bohemian Rhapsody
      'kJQP7kiw5Fk'  // 例：Luis Fonsi - Despacito
    ],
    '3d': [
      'YQHsXMglC9A', // 例：Adele - Hello
      '9bZkp7q19f0', // 例：PSY - Gangnam Style
      'CevxZvSJLk8', // 例：Katy Perry - Roar
      'hT_nvWreIhg'  // 例：Charlie Puth - See You Again
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100 font-['Orbitron',sans-serif] text-slate-800">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          scroll-behavior: smooth;
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-2xl border-b border-blue-200/50 sticky top-0 z-50 shadow-lg shadow-blue-100/20">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-violet-700 p-2.5 rounded-xl shadow-2xl shadow-blue-500/25">
                <VideoIcon />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-700 bg-clip-text text-transparent font-['Orbitron']">
                CreativeStudio
              </h1>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                サービス
              </a>
              <a href="#portfolio" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                ポートフォリオ
              </a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                会社概要
              </a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                お問い合わせ
              </a>
            </nav>
            <button className="bg-gradient-to-r from-blue-600 to-violet-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              無料相談
            </button>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section id="hero" data-animate className="pt-24 pb-40 relative overflow-hidden">
        {/* 3D Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{ pointerEvents: 'none' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-cyan-100/10 to-violet-200/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center max-w-5xl mx-auto fade-in-up ${isVisible.hero ? 'visible' : ''}`}>
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight font-['Exo_2'] text-glow">
              <span className="block text-slate-800">あなたの</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                ビジョン
              </span>
              <span className="block text-slate-800">を映像で実現</span>
            </h2>
            <p className={`text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto fade-in-up stagger-1 ${isVisible.hero ? 'visible' : ''}`}>
              最新の2D・3D技術を駆使して、心に響く映像コンテンツを制作します。<br />
              企業プロモーション、CM、アニメーション、VRコンテンツまで幅広く対応。
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center fade-in-up stagger-2 ${isVisible.hero ? 'visible' : ''}`}>
              <button className="group bg-gradient-to-r from-blue-600 to-violet-700 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
                <PlayIcon />
                <span className="ml-3">制作事例を見る</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </button>
              <button className="border-2 border-slate-400 text-slate-700 px-10 py-5 rounded-full text-lg font-semibold hover:bg-slate-100 hover:border-slate-500 transition-all duration-300">
                サービス詳細
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* サービス紹介 */}
      <section id="services" data-animate className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 fade-in-up ${isVisible.services ? 'visible' : ''}`}>
            <h3 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight font-['Exo_2']">
              私たちのサービス
            </h3>
            <p className="text-slate-600 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              2D・3D映像制作のプロフェッショナルチームが、<br />あなたのプロジェクトを成功に導きます
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* 2D映像制作 */}
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-blue-200/50 hover:bg-white/90 hover:border-blue-300/70 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 fade-in-up stagger-1 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-5 rounded-2xl w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CameraIcon />
              </div>
              <h4 className="text-3xl font-bold text-slate-800 mb-6 font-['Orbitron']">2D映像制作</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                企業プロモーション、CM、説明動画、アニメーションなど、様々な2D映像コンテンツを制作します。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">企業プロモーション動画</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">商品紹介動画</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">アニメーション制作</span>
                </li>
              </ul>
            </div>

            {/* 3D映像制作 */}
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-violet-200/50 hover:bg-white/90 hover:border-violet-300/70 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-500 fade-in-up stagger-2 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-violet-600 to-purple-500 p-5 rounded-2xl w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <VideoIcon />
              </div>
              <h4 className="text-3xl font-bold text-slate-800 mb-6 font-['Orbitron']">3D映像制作</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                最新の3D技術を使用して、没入感のあるリアルな映像コンテンツを制作します。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">3DCGアニメーション</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">建築ビジュアライゼーション</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">VR/ARコンテンツ</span>
                </li>
              </ul>
            </div>

            {/* コンサルティング */}
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-emerald-200/50 hover:bg-white/90 hover:border-emerald-300/70 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 fade-in-up stagger-3 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-emerald-600 to-teal-500 p-5 rounded-2xl w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <UsersIcon />
              </div>
              <h4 className="text-3xl font-bold text-slate-800 mb-6 font-['Orbitron']">コンサルティング</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                映像戦略の企画から制作、配信まで、トータルサポートいたします。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-emerald-600 font-medium">映像戦略立案</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-emerald-600 font-medium">制作プロセス最適化</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-emerald-600 font-medium">効果測定・分析</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ポートフォリオセクション */}
      <section id="portfolio" data-animate className="py-24 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 fade-in-up ${isVisible.portfolio ? 'visible' : ''}`}>
            <h3 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight font-['Exo_2']">
              制作実績
            </h3>
            <p className="text-slate-600 text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
              これまでに手がけた2D・3D映像作品をご紹介します
            </p>
            
            {/* タブ切り替え */}
            <div className={`flex justify-center mb-12 fade-in-up stagger-1 ${isVisible.portfolio ? 'visible' : ''}`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 border border-blue-200/50 shadow-lg">
                <button
                  onClick={() => setActiveTab('2d')}
                  className={`px-10 py-4 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === '2d'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/25'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  2D映像
                </button>
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`px-10 py-4 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === '3d'
                      ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-xl shadow-violet-500/25'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  3D映像
                </button>
              </div>
            </div>
          </div>

          {/* 動画グリッド */}
          <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {videoIds[activeTab as keyof typeof videoIds].map((videoId, index) => (
              <div key={index} className={`group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 hover:border-blue-300/70 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 fade-in-up stagger-${index + 1} ${isVisible.portfolio ? 'visible' : ''}`}>
                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${activeTab === '2d' ? '2D' : '3D'}映像作品 ${index + 1}`}
                    className="w-full h-full rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-slate-800 mb-4 font-['Orbitron']">
                    {activeTab === '2d' ? '2D' : '3D'}映像作品 {index + 1}
                  </h4>
                  <p className="text-slate-600 font-light leading-relaxed">
                    {activeTab === '2d' 
                      ? 'クリエイティブな2D映像表現で、メッセージを効果的に伝える作品です。'
                      : '最新の3D技術を駆使した、没入感のある映像体験を提供します。'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <section id="stats" data-animate className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-blue-200/50 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 fade-in-up stagger-1 ${isVisible.stats ? 'visible' : ''}`}>
              <div className="text-5xl font-black text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 font-['Exo_2']">500+</div>
              <div className="text-slate-700 font-medium text-lg">制作実績</div>
            </div>
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-violet-200/50 hover:bg-white/90 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-500 fade-in-up stagger-2 ${isVisible.stats ? 'visible' : ''}`}>
              <div className="text-5xl font-black text-violet-600 mb-4 group-hover:scale-110 transition-transform duration-300 font-['Exo_2']">100+</div>
              <div className="text-slate-700 font-medium text-lg">企業クライアント</div>
            </div>
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-emerald-200/50 hover:bg-white/90 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 fade-in-up stagger-3 ${isVisible.stats ? 'visible' : ''}`}>
              <div className="text-5xl font-black text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 font-['Exo_2']">5</div>
              <div className="text-slate-700 font-medium text-lg">受賞歴</div>
            </div>
            <div className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-yellow-200/50 hover:bg-white/90 hover:shadow-2xl hover:shadow-yellow-100/50 transition-all duration-500 fade-in-up stagger-4 ${isVisible.stats ? 'visible' : ''}`}>
              <div className="text-5xl font-black text-yellow-600 mb-4 group-hover:scale-110 transition-transform duration-300 font-['Exo_2']">99%</div>
              <div className="text-slate-700 font-medium text-lg">顧客満足度</div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" data-animate className="py-24 bg-gradient-to-br from-blue-100/50 to-cyan-100/50">
        <div className="container mx-auto px-6 text-center">
          <div className={`max-w-4xl mx-auto fade-in-up ${isVisible.contact ? 'visible' : ''}`}>
            <h3 className="text-5xl md:text-6xl font-black text-slate-800 mb-8 tracking-tight font-['Exo_2']">
              プロジェクトを<br />始めませんか？
            </h3>
            <p className={`text-xl md:text-2xl text-slate-600 mb-12 font-light leading-relaxed fade-in-up stagger-1 ${isVisible.contact ? 'visible' : ''}`}>
              無料相談で、あなたのアイデアを映像化する最適な方法をご提案します。
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center fade-in-up stagger-2 ${isVisible.contact ? 'visible' : ''}`}>
              <button className="group relative bg-gradient-to-r from-blue-600 to-violet-700 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                <span className="relative z-10">無料相談を申し込む</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button className="border-2 border-slate-400 text-slate-700 px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/50 hover:border-slate-500 transition-all duration-300">
                資料をダウンロード
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-800/90 border-t border-slate-300/50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-violet-700 p-3 rounded-xl shadow-2xl shadow-blue-500/25">
                <VideoIcon />
              </div>
              <h4 className="text-2xl font-bold text-white font-['Orbitron']">CreativeStudio</h4>
            </div>
            <p className="text-slate-400 mb-8 font-light">
              © 2024 CreativeStudio. All rights reserved.
            </p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">
                プライバシーポリシー
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">
                利用規約
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}