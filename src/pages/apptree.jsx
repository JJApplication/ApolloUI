import {Component} from "react";
import {Grid, Text, User} from "@geist-ui/core";

class Apptree extends Component {

    render() {
        return (
            <>
                <Text h4>服务结构</Text>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={24} md={24}>
                        <User text="App" name="NoEngine">
                            位于顶层架构的负载均衡, 流量统计, 静态伺服服务
                        </User>
                    </Grid>
                    <Grid xs={22} md={22}>
                        <User text="App" name="Sandwich">
                            由go编写的API网关, 负责路由的转发, 流量清洗, 全局鉴权
                        </User>
                    </Grid>
                    <Grid xs={22} md={22}>
                        <User text="App" name="Frp">
                            内网穿透服务端, 负责转发固定流量到外部网络
                        </User>
                    </Grid>
                    <Grid xs={22} md={22}>
                        <User text="App" name="Apollo">
                            由go编写的微服务一站式管理服务
                        </User>
                    </Grid>
                    <Grid xs={22} md={22}>
                        <User text="App" name="Athena">
                            由go编写的全局数据库(sqlite, redis, mongo)处理中间层
                        </User>
                    </Grid>
                    <Grid xs={22} md={22}>
                        <User text="App" name="Hermes">
                            由go编写的全局消息处理中间层
                        </User>
                    </Grid>
                    <Grid xs={20} md={20}>
                        <User text="App" name="Frp">
                            内网穿透服务端, 负责转发固定流量到外部网络
                        </User>
                    </Grid>
                    <Grid xs={20} md={20}>
                        <User text="Group" name="AppGroup">
                            运行在下层的微服务群组
                        </User>
                    </Grid>
                    <Grid xs={24} md={24}>
                        <User text="Foundation" name="WDNMD">
                            底层的微服务监控告警组件
                        </User>
                    </Grid>
                    <Grid xs={24} md={24}>
                        <User text="Foundation" name="SSL Encrypt">
                            底层的SSL证书自动刷新组件
                        </User>
                    </Grid>
                    <Grid xs={24} md={24}>
                        <User text="Foundation" name="OctopusTree">
                            App模型文件同步管理组件
                        </User>
                    </Grid>
                    <Grid xs={24} md={24}>
                        <User text="Foundation" name="OctopusTwig">
                            OctopusTree配套的全局unixsocket管理组件
                        </User>
                    </Grid>
                </Grid.Container>
            </>
        )
    }
}

export default Apptree;