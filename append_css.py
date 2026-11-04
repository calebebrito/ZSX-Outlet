path = 'style.css'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('\r\n', '\n')

css_to_add = '''

/* Seção de Benefícios (Frete Grátis, Suporte 24h, Entrega Brasil) */
.beneficios {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 90px auto 50px;
    padding: 35px 20px;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
}

.beneficio-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 25px;
    transition: transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    cursor: default;
}

.beneficio-item:hover {
    transform: translateY(-4px);
}

.beneficio-icon {
    color: #1a1a1a;
    margin-bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.beneficio-item:hover .beneficio-icon {
    transform: scale(1.1);
}

.beneficio-titulo {
    font-size: 19px;
    font-weight: 700;
    color: #222222;
    margin: 0 0 8px 0;
    letter-spacing: -0.3px;
}

.beneficio-legenda {
    font-size: 13.5px;
    font-weight: 400;
    color: #7a7266;
    margin: 0;
    line-height: 1.45;
    max-width: 260px;
}

.beneficio-divisor {
    width: 1px;
    height: 65px;
    background-color: rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
    .beneficios {
        flex-direction: column;
        gap: 30px;
        padding: 30px 15px;
    }
    .beneficio-divisor {
        width: 60%;
        height: 1px;
    }
}
'''

text = text.rstrip() + css_to_add
text = text.replace('\n', '\r\n')

with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(text)

print('Successfully appended to style.css')

