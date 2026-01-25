const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const products = [
    {
        title: "McLaren P1 Concept",
        category: "Technic Series",
        price: 449.99,
        scale: "1:8 Scale",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrxEq7Nwxn46UgVprGI2yljPLGE415wGMLW9TCdjXRli4p0b8UPMQdvia3_DoYC6v9skoUFyzynf5LAvOmITczj0StYqxSb_AJ3XHPBwdgUbkf2D4kTtZYq1uzWyt3RvKdKi3asEPkAp-MUu87gPKbw1MKf11KJ24l4XzHIWBfVvXF89MFQdMxZllsP0Poyr6EOH7zNhItdDszZML73WTWFrRLOvnOufZ2C3toB0jGSf6jfzU8GJwwgbTDHuK-toLu-TwVmRUC7Rg",
        keywords: "yellow supercar mclaren p1 lego technic engine",
        tag: null
    },
    {
        title: "1967 Silver Stingray",
        category: "Die-Cast Elite",
        price: 129.50,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXF0F4H_37Vp6DFoJQShjwx-ZQ8SHPYffBqR9BJmZhUeUW31tk9HDzVpMw_QWP4A9vsFoQ10njzc7M9Mg3LXfR92qrotmabS9milIm9RI6PrvhDwWsXd21CTdOjZaTP5yl9Y2-hmKHbFPJspwEnEMmsk2PyW_YbDr_1zjS7hygK9LepDE_-Y70EEQj5fiIhFaWg9XMFSDDhppP2Nu464C9JqsPicKM3OtKQtB6oIkOIR35Cq23W2zNMtExwS_FmHUyAf5E3u5Oo3o",
        keywords: "silver vintage racing car stingray corvette die-cast elite",
        tag: "Limited"
    },
    {
        title: "Ferrari F40 Tribute",
        category: "Speed Champions",
        price: 24.99,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmJ2KmZeXt0sPSqYR5rXEOrpJX8Q3a7QwJrss963VeXPlT5DsEYHSWICIXY8t3RF8aXl2gqH5-xB-9cSRkEUpsyqtCbO83E0dORQxvNEjVbnPkK0VuHCSIzhSXALVGEdVlTPCPQqri2sYqwFYtNcZHcLyLsAYh4JT3OllifylJ_QDftd471ZJQBUzHflxpbZUGaz_J7LvGM-EfP54o3f1fxpHcZ4BnRaMCoeAi_A1iORRmbBmC6RT_ttxE17r7oJTPY1qxrELgy1c",
        keywords: "red ferrari f40 sports car speed champions lego",
        tag: null
    },
    {
        title: "Time Machine DeLorean",
        category: "Icons Cinema",
        price: 199.99,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgkG5wcQbirfI4dMeFq67hztl9KwLw7I3IK8rQe04QVdlikYQoCIQZBIPt2gApwuMuZVwdxUE8yki3e6kn9qaqQs-E-UV__sUj0yqench67mqsV9lCSmoZsIcLCY4MKD1ryhSSvA3rTdcApG2cZK6iYcVTfKnRXRXbv2Y63Id6OxRPxFvAFLsGGk_qER1Ett_YFb-TsZf36i7AozeSpQpvDwfg19idAx84R3uQzh6Alkg49gqOEr2wrgsF6V9LPs9rTdsWWqgSr54",
        keywords: "back to the future delorean time machine lego icons silver movie car",
        tag: null
    },
    {
        title: "4x4 Mercedes-Benz Zetros",
        category: "Technic Extreme",
        price: 299.99,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLqu_L94cJ_SenJhlDu2wAuxaUYF0Jr3lM3po47OmAkZO4ANkLbJmB6YmUG-JITelFiSyBpvlEVzFVp3_5WptEFfkAMAk9Dp7iVY-WrfmZpUp0lFs5TtRD78zaDFdY0aF8aQNiPei4yTg4Bu1vAb6859i5ksFs-v-9JsDlTFUrD4F_3eUS4nEHrMrlq9OfpWkn2HTGrkLfn2eQDU_mFOB_ezY1uTRPotBf3wQku1FQybt4HMChqWay4-Ziwkpt6rzFSAWN76Dm1Rw",
        keywords: "green mercedes-benz zetros truck 4x4 offroad lego technic",
        tag: null
    },
    {
        title: "2024 Ultimate Collection",
        category: "Coming Soon",
        price: 899.00,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgY8PRWqpWvFDweAIreg-Ue3io878A2H7kT9mVgp-oosPWjSqAgQd8mZNQeNGjZKuP_dl_jVNuX9LLgTFegJOPMriIL7du9JAoojBT6BM91jKmIymEEqO-JTqC14nGii_U9igW0Tu-_reK6ovkt2BxyVsM6JdbPDBZsLylW6jvFipytus8ftsdva4oPBmBGRMqYuGpU0gSw2GJQO97G773V79J33OFgzVhBpafn0XCybJ7QzjXcIHUQL5dril2_7FVvFSNLPHn6Ng",
        keywords: "premium car collector box set",
        tag: "Coming Soon",
        comingSoon: true
    },
    {
        title: "Hyper-Track Z1",
        category: "Die-Cast Elite",
        price: 155.00,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcBRD-8jtU_byOr5HDtWebYLwqmQLZBCrzCrHwoh-R83YXlsCONju6Ac1ypeNOd874QyHOsdCpF-KZbGFw8f98ZTd4Ric87NhBk9l2b8xXxazOPGJklhBboyvXu5W9hNbN_x8DrOXBwoDSX3dHCVJ8PUDDno_QIV7LYWjK74s_QbuDfW-j2rebNmLu35v11nJtCLUWbssIaE0-bAz74NZN8MJ4JSYusVwmOfNHNlN3Mtm6ZNUuRZZw-U6r7B9YyA0GXI_1oXsH82o",
        keywords: "black modern supercar hyper-track z1 elite die-cast fast racing",
        tag: null
    },
    {
        title: "Alpine Rally Turbo",
        category: "Speed Champions",
        price: 19.99,
        scale: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLkB0YTI1vZz4PQbEd-nX2D_O8TUpmgeQOiR4Lmc8KcZTXX2MRFLMkAeFOy6CbXChL8azOr7uQJVHdqjhfkIILYa_Ydr32MZ6lw-K7vMRr-QZDzDqGmTaxCv5goIsEyb0qZAZqgRVCjxntKkT5s-Q7bEPYcxMdIT6qI9cjplqh7jiRUG_PEuvDDthk7bWugSwROtfSu-3T9EiCVatkwbRu5lyRAAiyzQ0E0ABir_xoqpv6Zt6KZFuWBOtODX1X9Jx-gQKifrfMwyk",
        keywords: "blue rally car alpine turbo speed champions lego racing",
        tag: null
    },
    {
        title: "Lamborghini Sián FKP 37",
        category: "Technic Ultimate",
        price: 379.99,
        scale: "1:8 Scale",
        image: "/images/lamborghini.png",
        keywords: "green supercar lamborghini sian technic lego luxury",
        tag: "Hot"
    },
    {
        title: "Porsche 911 GT3 RS",
        category: "Technic Ultimate",
        price: 299.99,
        scale: "1:8 Scale",
        image: "/images/porsche.png",
        keywords: "orange supercar porsche 911 gt3 rs technic lego racing",
        tag: null
    },
    {
        title: "Bugatti Chiron",
        category: "Technic Ultimate",
        price: 349.99,
        scale: "1:8 Scale",
        image: "/images/bugatti.png",
        keywords: "blue supercar bugatti chiron technic lego luxury",
        tag: "Premium"
    },
    {
        title: "Ford Mustang GT",
        category: "Icons Classic",
        price: 169.99,
        scale: null,
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800",
        keywords: "blue muscle car ford mustang icons lego classic",
        tag: null
    },
    {
        title: "Land Rover Defender",
        category: "Technic Adventure",
        price: 199.99,
        scale: "1:10 Scale",
        image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800",
        keywords: "green offroad land rover defender technic lego 4x4",
        tag: null
    },
    {
        title: "Nissan GT-R NISMO",
        category: "Speed Champions",
        price: 19.99,
        scale: null,
        image: "https://images.unsplash.com/photo-1532152345572-46fcbe262bc2?auto=format&fit=crop&q=80&w=800",
        keywords: "white supercar nissan gtr nismo speed champions lego",
        tag: null
    },
    {
        title: "Toyota GR Supra",
        category: "Speed Champions",
        price: 19.99,
        scale: null,
        image: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?auto=format&fit=crop&q=80&w=800",
        keywords: "yellow sports car toyota supra speed champions lego",
        tag: null
    },
    {
        title: "Jeep Wrangler Rubicon",
        category: "Technic Adventure",
        price: 49.99,
        scale: null,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
        keywords: "yellow offroad jeep wrangler technic lego 4x4",
        tag: "New"
    },
    {
        title: "Chevrolet Corvette ZR1",
        category: "Technic Racing",
        price: 49.99,
        scale: null,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        keywords: "orange supercar corvette zr1 technic lego racing",
        tag: null
    }
];

async function main() {
    console.log('Seeding products...');
    for (const p of products) {
        await prisma.product.create({
            data: p
        });
    }
    console.log('Seed successful!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
