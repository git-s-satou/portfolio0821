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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    portfolio: false,
    stats: false,
    contact: false
  })
  const [fbxModel, setFbxModel] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)

  // FBXモデルの読み込み試行
  useEffect(() => {
    const checkForFbxModel = async () => {
      try {
        // window.fs.readFile APIを使ってFBXファイルを探す
        // 実際の実装では、ユーザーがアップロードしたFBXファイルのパスを指定
        // const modelData = await window.fs.readFile('model.fbx')
        // setFbxModel(modelData)
      } catch (error) {
        console.log('No FBX model found, using default geometric shapes')
      }
    }
    checkForFbxModel()
  }, [])

  // 3D幾何学的オブジェクトのアニメーション
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      if (fbxModel) {
        // FBXモデルが利用可能な場合は、そのモデルを表示
        // 実際の実装ではThree.jsなどを使用してFBXモデルを描画
        drawFbxModel(ctx, centerX, centerY, rotation)
      } else {
        // デフォルトの幾何学的形状を表示
        drawGeometricShapes(ctx, centerX, centerY, rotation)
      }
      
      rotation += 0.008
      animationId = requestAnimationFrame(animate)
    }

    const drawFbxModel = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) => {
      // FBXモデル表示のプレースホルダー
      // 実際の実装では Three.js や他の3Dライブラリを使用
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      
      // シンプルなプレースホルダー表示
      ctx.fillStyle = 'rgba(59, 130, 246, 0.7)'
      ctx.fillRect(-150, -150, 300, 300)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = 'bold 24px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('3D MODEL', 0, 0)
      
      ctx.restore()
    }

    const drawGeometricShapes = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      // ジェネラティブアートパターン
      drawGenerativeArt(ctx, rotation)
      
      ctx.restore()
    }

    const drawGenerativeArt = (ctx: CanvasRenderingContext2D, time: number) => {
      const width = canvas.width
      const height = canvas.height
      
      // パラメトリック曲線による流動的なパターン
      ctx.save()
      
      // 複数のレイヤーでジェネラティブパターンを描画
      for (let layer = 0; layer < 5; layer++) {
        ctx.save()
        
        const layerOffset = layer * 0.3
        const layerTime = time + layerOffset
        
        // レイヤーごとの色とアルファ値
        const colors = [
          `rgba(59, 130, 246, ${0.1 - layer * 0.015})`,   // blue
          `rgba(139, 92, 246, ${0.08 - layer * 0.012})`,  // violet
          `rgba(34, 197, 94, ${0.06 - layer * 0.01})`,    // green
          `rgba(245, 158, 11, ${0.05 - layer * 0.008})`,  // yellow
          `rgba(236, 72, 153, ${0.04 - layer * 0.006})`   // pink
        ]
        
        ctx.strokeStyle = colors[layer]
        ctx.lineWidth = 1.5 - layer * 0.15
        
        // フローフィールドパターン
        drawFlowField(ctx, layerTime, layer, width, height)
        
        // 波紋パターン
        drawRipples(ctx, layerTime, layer, width, height)
        
        // パーティクルシステム風パターン
        drawParticleSystem(ctx, layerTime, layer, width, height)
        
        ctx.restore()
      }
      
      ctx.restore()
    }

    const drawFlowField = (ctx: CanvasRenderingContext2D, time: number, layer: number, width: number, height: number) => {
      const gridSize = 80 + layer * 20
      const flowStrength = 100 + layer * 30
      
      for (let x = -width/2; x < width/2; x += gridSize) {
        for (let y = -height/2; y < height/2; y += gridSize) {
          const angle = Math.sin(x * 0.01 + time) + Math.cos(y * 0.01 + time * 0.7) + layer * 0.5
          const length = flowStrength
          
          const endX = x + Math.cos(angle) * length
          const endY = y + Math.sin(angle) * length
          
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(endX, endY)
          ctx.stroke()
          
          // 矢印の頭部
          const arrowSize = 4 + layer
          ctx.beginPath()
          ctx.moveTo(endX, endY)
          ctx.lineTo(endX - Math.cos(angle - 0.5) * arrowSize, endY - Math.sin(angle - 0.5) * arrowSize)
          ctx.moveTo(endX, endY)
          ctx.lineTo(endX - Math.cos(angle + 0.5) * arrowSize, endY - Math.sin(angle + 0.5) * arrowSize)
          ctx.stroke()
        }
      }
    }

    const drawRipples = (ctx: CanvasRenderingContext2D, time: number, layer: number, width: number, height: number) => {
      const rippleCount = 6 + layer * 2
      const maxRadius = 300 + layer * 50
      
      for (let i = 0; i < rippleCount; i++) {
        const rippleTime = time * 0.5 + i * 2
        const radius = (rippleTime % (maxRadius * 0.02)) * 50
        
        if (radius < maxRadius) {
          const centerX = Math.sin(i * 2.5 + time * 0.3) * (width * 0.2)
          const centerY = Math.cos(i * 1.8 + time * 0.4) * (height * 0.2)
          
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
          ctx.stroke()
          
          // 内側の小さなリング
          if (radius > 30) {
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius - 15, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      }
    }

    const drawParticleSystem = (ctx: CanvasRenderingContext2D, time: number, layer: number, width: number, height: number) => {
      const particleCount = 20 + layer * 10
      const connectionDistance = 150 + layer * 30
      
      const particles = []
      
      // パーティクル位置の計算
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * 0.2
        const distance = 200 + Math.sin(time * 0.5 + i) * 100
        const x = Math.cos(angle) * distance + Math.sin(time * 0.3 + i * 0.5) * 50
        const y = Math.sin(angle) * distance + Math.cos(time * 0.4 + i * 0.3) * 50
        
        particles.push({ x, y })
        
        // パーティクルを描画
        ctx.beginPath()
        ctx.arc(x, y, 1.5 + layer * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // パーティクル間の接続線
      ctx.save()
      ctx.globalAlpha = 0.3 - layer * 0.05
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.restore()
    }

    animate()

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [fbxModel])

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

  // YouTubeの動画ID
  const videoIds = {
    '2d': [
      'dQw4w9WgXcQ',
      'L_jWHffIx5E',
      'fJ9rUzIMcZQ',
      'kJQP7kiw5Fk'
    ],
    '3d': [
      'YQHsXMglC9A',
      '9bZkp7q19f0',
      'CevxZvSJLk8',
      'hT_nvWreIhg'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-['Inter',sans-serif] text-slate-800">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
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
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* ヘッダー */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              CreativeStudio
            </h1>
            <nav className="hidden md:flex space-x-12">
              <a href="#services" className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium">
                サービス
              </a>
              <a href="#portfolio" className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium">
                ポートフォリオ
              </a>
              <a href="#about" className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium">
                会社概要
              </a>
              <a href="#contact" className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium">
                お問い合わせ
              </a>
            </nav>
            <button className="bg-slate-800 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-700 hover:shadow-lg transition-all duration-300">
              無料相談
            </button>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section id="hero" data-animate className="pt-20 pb-32 relative overflow-hidden min-h-screen flex items-center">
        {/* 3D Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ pointerEvents: 'none' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-indigo-50/60"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左側のテキストコンテンツ */}
            <div className={`fade-in-up ${isVisible.hero ? 'visible' : ''}`}>
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight text-glow">
                <span className="block text-slate-800">映像で</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  未来を
                </span>
                <span className="block text-slate-800">創造する</span>
              </h2>
              <p className={`text-xl text-slate-600 mb-12 leading-relaxed font-light max-w-2xl fade-in-up stagger-1 ${isVisible.hero ? 'visible' : ''}`}>
                最先端の2D・3D映像技術で、あなたのビジョンを現実に。<br />
                企業ブランディングから次世代コンテンツまで、創造性に限界はありません。
              </p>
              <div className={`flex flex-col sm:flex-row gap-6 fade-in-up stagger-2 ${isVisible.hero ? 'visible' : ''}`}>
                <button 
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-slate-800 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <PlayIcon />
                  <span className="ml-3">制作事例を見る</span>
                </button>
                <button className="border-2 border-slate-300 text-slate-700 px-10 py-4 rounded-full text-lg font-medium hover:bg-white hover:border-slate-400 hover:shadow-md transition-all duration-300">
                  サービス詳細
                </button>
              </div>
            </div>

            {/* 右側の統計情報カード */}
            <div className={`lg:justify-self-end fade-in-up stagger-3 ${isVisible.hero ? 'visible' : ''}`}>
              <div className="grid grid-cols-2 gap-6 max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-slate-600 text-sm font-medium">制作実績</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                  <div className="text-3xl font-bold text-violet-600 mb-2">100+</div>
                  <div className="text-slate-600 text-sm font-medium">企業クライアント</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">99%</div>
                  <div className="text-slate-600 text-sm font-medium">顧客満足度</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">24h</div>
                  <div className="text-slate-600 text-sm font-medium">平均応答時間</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* サービス紹介 */}
      <section id="services" data-animate className="py-32 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className={`text-center mb-24 fade-in-up ${isVisible.services ? 'visible' : ''}`}>
            <h3 className="text-4xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight">
              Creative Services
            </h3>
            <p className="text-slate-600 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              2D・3D映像制作のスペシャリストが、<br />革新的なビジュアルソリューションを提供します
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 2D映像制作 */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/70 hover:shadow-xl transition-all duration-500 fade-in-up stagger-1 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 mb-8 group-hover:scale-110 transition-transform duration-300">
                <CameraIcon />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-6">2D Motion Graphics</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                ブランドストーリーを伝える洗練された2D映像コンテンツを制作します。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">ブランド映像</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">プロダクト紹介</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-blue-600 font-medium">モーショングラフィックス</span>
                </li>
              </ul>
            </div>

            {/* 3D映像制作 */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/70 hover:shadow-xl transition-all duration-500 fade-in-up stagger-2 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-violet-500 to-violet-600 p-4 rounded-2xl w-16 h-16 mb-8 group-hover:scale-110 transition-transform duration-300">
                <VideoIcon />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-6">3D Visualization</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                没入感のある3D空間で、リアルな体験を創造します。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">3DCGアニメーション</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">空間ビジュアライゼーション</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircleIcon />
                  <span className="ml-3 text-violet-600 font-medium">インタラクティブコンテンツ</span>
                </li>
              </ul>
            </div>

            {/* コンサルティング */}
            <div className={`group bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/70 hover:shadow-xl transition-all duration-500 fade-in-up stagger-3 ${isVisible.services ? 'visible' : ''}`}>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 mb-8 group-hover:scale-110 transition-transform duration-300">
                <UsersIcon />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-6">Strategic Consulting</h4>
              <p className="text-slate-600 mb-8 leading-relaxed font-light">
                映像戦略から配信まで、トータルサポートを提供します。
              </p>
              <ul className="space-y-3">
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
      <section id="portfolio" data-animate className="py-32 bg-gradient-to-br from-slate-50/80 to-blue-50/60">
        <div className="container mx-auto px-8">
          <div className={`mb-24 fade-in-up ${isVisible.portfolio ? 'visible' : ''}`}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight">
                  Featured Works
                </h3>
                <p className="text-slate-600 text-xl font-light max-w-2xl leading-relaxed">
                  クリエイティブな映像制作で実現した、<br />印象的なプロジェクトをご紹介
                </p>
              </div>
              
              {/* タブ切り替え */}
              <div className={`fade-in-up stagger-1 ${isVisible.portfolio ? 'visible' : ''}`}>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50 shadow-sm">
                  <button
                    onClick={() => setActiveTab('2d')}
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === '2d'
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    2D Works
                  </button>
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === '3d'
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    3D Works
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 動画グリッド - 非対称レイアウト */}
          <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* 大きなメイン動画 */}
            <div className={`col-span-12 lg:col-span-8 group bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 hover:border-slate-300/70 hover:shadow-xl transition-all duration-500 fade-in-up ${isVisible.portfolio ? 'visible' : ''}`}>
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoIds[activeTab as keyof typeof videoIds][0]}`}
                  title={`Featured ${activeTab === '2d' ? '2D' : '3D'} Work`}
                  className="w-full h-full rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold text-slate-800 mb-4">
                  Featured {activeTab === '2d' ? '2D' : '3D'} Project
                </h4>
                <p className="text-slate-600 font-light leading-relaxed text-lg">
                  {activeTab === '2d' 
                    ? '革新的な2Dモーショングラフィックスで、ブランドの価値を鮮やかに表現した代表作品です。'
                    : '最新の3D技術を駆使し、没入感のある映像体験を創造した話題のプロジェクトです。'
                  }
                </p>
              </div>
            </div>

            {/* 右側の小さな動画たち */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {videoIds[activeTab as keyof typeof videoIds].slice(1).map((videoId, index) => (
                <div key={index} className={`group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 hover:border-slate-300/70 hover:shadow-lg transition-all duration-500 fade-in-up stagger-${index + 1} ${isVisible.portfolio ? 'visible' : ''}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`${activeTab === '2d' ? '2D' : '3D'} Work ${index + 2}`}
                      className="w-full h-full rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">
                      Project #{index + 2}
                    </h4>
                    <p className="text-slate-600 font-light text-sm leading-relaxed">
                      {activeTab === '2d' 
                        ? 'クリエイティブな2D表現による印象的な作品'
                        : '立体感のある3D映像で新しい体験を創造'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" data-animate className="py-32 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 fade-in-up ${isVisible.contact ? 'visible' : ''}`}>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-800 mb-8 tracking-tight">
                Let's Create<br />Something Amazing
              </h3>
              <p className={`text-xl text-slate-600 mb-12 font-light leading-relaxed fade-in-up stagger-1 ${isVisible.contact ? 'visible' : ''}`}>
                あなたのプロジェクトを次のレベルへ。<br />
                無料コンサルテーションで、最適なソリューションをご提案します。
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center fade-in-up stagger-2 ${isVisible.contact ? 'visible' : ''}`}>
              <button 
                onClick={() => setShowContactForm(true)}
                className="group relative bg-slate-800 text-white px-12 py-5 rounded-full text-lg font-medium hover:bg-slate-700 hover:shadow-xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">無料相談を始める</span>
                <div className="absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-16">
        <div className="container mx-auto px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-white mb-8">CreativeStudio</h4>
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

      {/* メールフォームモーダル */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-slate-800">お問い合わせ</h3>
                <button 
                  onClick={() => setShowContactForm(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors"
                      placeholder="山田太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      会社名
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors"
                      placeholder="株式会社サンプル"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors"
                      placeholder="090-1234-5678"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    プロジェクトタイプ
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors">
                    <option value="">選択してください</option>
                    <option value="2d">2D映像制作</option>
                    <option value="3d">3D映像制作</option>
                    <option value="consulting">コンサルティング</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    予算
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors">
                    <option value="">選択してください</option>
                    <option value="under-50">50万円未満</option>
                    <option value="50-100">50万円〜100万円</option>
                    <option value="100-300">100万円〜300万円</option>
                    <option value="300-500">300万円〜500万円</option>
                    <option value="over-500">500万円以上</option>
                    <option value="tbd">要相談</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    プロジェクト詳細 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-500 focus:outline-none transition-colors resize-none"
                    placeholder="プロジェクトの詳細、ご要望、スケジュールなどをお聞かせください。"
                  ></textarea>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 w-4 h-4 text-slate-800 rounded border-slate-300 focus:ring-slate-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-slate-600 leading-relaxed">
                    <span className="text-red-500">*</span>
                    プライバシーポリシーに同意します。お預かりした個人情報は、お問い合わせへの回答および弊社サービスのご案内にのみ使用いたします。
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-medium hover:bg-slate-700 transition-colors duration-300"
                  >
                    送信する
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-xl font-medium hover:bg-slate-50 transition-colors duration-300"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}