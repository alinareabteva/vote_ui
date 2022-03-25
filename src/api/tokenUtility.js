const TOKENS_KEY = 'auth_tokens_container';

class TokenUtility {
     getTokens() {
        const tokenStr = localStorage.getItem(TOKENS_KEY);

        if (tokenStr) {
            return JSON.parse(tokenStr);
        }
        return {};
    }

    setTokens(tokens) {
        localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
        return tokens;
    }

    clear() {
        localStorage.removeItem(TOKENS_KEY);
    }

    updateTokens(payload) {
        return this.setTokens({
            ...this.getTokens(),
            ...payload,
        });
    }
}

const tokenUtility = new TokenUtility();

export default tokenUtility;