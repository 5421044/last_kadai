import { useEffect, useState } from "react"
import { fetchImages } from "./api";

function Header() {
    return (
        <header className="hero is-primary is-bold">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">犬種当てゲーム</h1>
                </div>
            </div>
        </header>
    );
}

function Rule() {
    <Header />
    return (
        <footer className="rule">
            <div className="content has-text-centered is-large">
                <p>ルール</p>
            </div>
            <div className="content has-text-centered">
                <p>A~Dの全4種類の犬の写真があります. </p>
                <p>各犬種は4枚の写真があります. </p>
                <p>この中から柴犬を見つけ, 下の選択肢から選んでください.</p>
            </div>
        </footer>
    );
}

function Image(props) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
                    <img src={props.src} alt="cute dog!" />
                </figure>
            </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
}

function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-3">
                        <Image src={url} />
                    </div>
                );
            })}
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <div className="select is-fullwidth">
                        <select name="breed" defaultValue="mix">
                            <option value="mix">A</option>
                            <option value="shiba">B</option>
                            <option value="husky">C</option>
                            <option value="pug">D</option>
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button type="submit" className="button is-dark">
                        確定
                    </button>
                </div>
            </div>
        </form>
    );
}

function Main() {
    const [urls1, set1Urls] = useState(null);
    useEffect(() => {
        fetchImages("mix").then((urls) => {
            set1Urls(urls);
        });
    }, []);
    const [urls2, set2Urls] = useState(null);
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            set2Urls(urls);
        });
    }, []);
    const [urls3, set3Urls] = useState(null);
    useEffect(() => {
        fetchImages("husky").then((urls) => {
            set3Urls(urls);
        });
    }, []);
    const [urls4, set4Urls] = useState(null);
    useEffect(() => {
        fetchImages("pug").then((urls) => {
            set4Urls(urls);
        });
    }, []);
    function reloadAnser(breed) {
        if (breed == "shiba") {
            alert("正解！！");
        } else {
            alert("不正解");
        };
    }
    return (
        <main>
            <section className="section">
                <div className="container">
                    A.
                    <Gallery urls={urls1} />
                    B.
                    <Gallery urls={urls2} />
                    C.
                    <Gallery urls={urls3} />
                    D.
                    <Gallery urls={urls4} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadAnser} />
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>このページの画像はDog APIから得ています.</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">詳しくはこちら</a>
                </p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Rule />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
