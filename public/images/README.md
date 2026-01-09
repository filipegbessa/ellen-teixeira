# Assets Necessários

Este diretório deve conter as seguintes imagens para o site funcionar completamente:

## Imagens Principais

### 1. Open Graph Image (Compartilhamento em Redes Sociais)
- **Arquivo**: `og-image.jpg`
- **Dimensões**: 1200x630 pixels
- **Formato**: JPG ou PNG
- **Descrição**: Imagem usada quando o site é compartilhado no WhatsApp, Facebook, etc.
- **Sugestão**: Logo + foto da Dra. Ellen + texto "Odontologia"

### 2. Ícones PWA (Progressive Web App)
- **Arquivo 1**: `icon-192.png`
  - **Dimensões**: 192x192 pixels
  - **Formato**: PNG com fundo transparente ou sólido
  - **Descrição**: Ícone pequeno do app

- **Arquivo 2**: `icon-512.png`
  - **Dimensões**: 512x512 pixels
  - **Formato**: PNG com fundo transparente ou sólido
  - **Descrição**: Ícone grande do app

- **Sugestão**: Use o logo da clínica ou iniciais "ET"

### 3. Foto da Dra. Ellen
- **Arquivo**: `dra-ellen.jpg`
- **Dimensões**: Mínimo 800x1000 pixels (orientação vertical)
- **Formato**: JPG
- **Descrição**: Foto profissional da Dra. Ellen Teixeira
- **Localização**: Seção "Sobre" do site

### 4. Foto da Equipe/Hero
- **Arquivo**: `hero-team.jpg`
- **Dimensões**: Mínimo 1200x800 pixels (orientação horizontal)
- **Formato**: JPG
- **Descrição**: Foto da equipe ou ambiente da clínica
- **Localização**: Seção principal (Hero) do site

### 5. Imagens dos Tratamentos
Criar pasta: `/images/treatments/`

- **Arquivo 1**: `1.jpg` - Ortodontia
- **Arquivo 2**: `2.jpg` - Implantes
- **Arquivo 3**: `3.jpg` - Clareamento
- **Arquivo 4**: `4.jpg` - Próteses

**Dimensões**: 600x400 pixels cada
**Formato**: JPG
**Descrição**: Fotos ilustrativas de cada tipo de tratamento

### 6. Logo da Clínica
- **Arquivo**: `logo.png`
- **Dimensões**: 400x200 pixels (pode variar)
- **Formato**: PNG com fundo transparente
- **Descrição**: Logo principal da clínica
- **Localização**: Header do site

## Otimização de Imagens

Para melhor performance, otimize todas as imagens antes de adicionar:

1. Use ferramentas como TinyPNG, Squoosh.app ou ImageOptim
2. Prefira formato WebP quando possível
3. Mantenha o tamanho do arquivo abaixo de 200KB (exceto OG image)

## Ferramentas Úteis

- **Criação de ícones PWA**: https://realfavicongenerator.net/
- **Otimização**: https://squoosh.app/
- **Redimensionamento**: https://www.iloveimg.com/resize-image
- **Design**: Canva.com ou Figma.com

## Status Atual

- [ ] og-image.jpg
- [ ] icon-192.png
- [ ] icon-512.png
- [ ] dra-ellen.jpg
- [ ] hero-team.jpg
- [ ] logo.png
- [ ] treatments/1.jpg
- [ ] treatments/2.jpg
- [ ] treatments/3.jpg
- [ ] treatments/4.jpg

## Depois de Adicionar as Imagens

1. Remova os placeholders de texto nos componentes
2. Descomente os componentes `<Image>` nos arquivos:
   - `src/components/sections/HeroSection.tsx`
   - `src/components/sections/AboutSection.tsx`
   - `src/components/sections/TreatmentsSection.tsx`
3. Atualize o componente Header para usar o logo real
4. Teste o PWA instalando o app no celular
5. Teste o compartilhamento nas redes sociais
